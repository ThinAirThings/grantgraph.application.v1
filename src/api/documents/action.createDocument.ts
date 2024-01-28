'use server'

import { zfd } from 'zod-form-data'
import {v4 as uuidv4} from 'uuid'
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { revalidateTag } from "next/cache"
import { safeAction } from '@/src/libs/safe-action/utlities'
import { auth } from '@/src/libs/auth/auth'
import { s3 } from '@/src/libs/aws/s3.client'
import { dynamodb } from '@/src/libs/aws/dynamodb.client'
// @ts-ignore
import pdf from "pdf-parse-debugging-disabled" 
import GPT4Tokenizer from 'gpt4-tokenizer';
import { openai } from '../../libs/openai/client.openai'

export const createDocumentAction = safeAction(zfd.formData({
    document: zfd.file()
}), async ({
    document
}) => {
    const {
        organizationId,
        userId
    } = (await auth())!.user!
    const pdfEntry = {
        document: {} as {
            documentName: string
            documentType: string
            text: string
            embedding: number[]
        },
        pages: [] as {
            pageIndex: number
            text: string
            embedding: number[]
        }[]
    }
    const pdfOutput = await pdf(Buffer.from(await document.arrayBuffer()), {
        //@ts-ignore
        pagerender: async (pageData) => {
            pdfEntry.pages.push({
                pageIndex: pageData.pageIndex as number,
                text: (await pageData.getTextContent()).items
                    .map((item: {str: string}) => item.str)
                    .join(' ')
                    .replace(/●/g, '')  // Remove bullet points
                    .replace(/[^\w\s.,;:'"&()\-\/]/g, '')  // Remove special characters except common punctuation
                    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
                    .replace(/[\r\n]+/g, ' ')  // Replace newlines with space
                    .trim(),  // Remove leading and trailing spaces 
                embedding: []
            })
            return pdfEntry.pages[pdfEntry.pages.length - 1].text
                .replace(/●/g, '')  // Remove bullet points
                .replace(/[^\w\s.,;:'"&()\-\/]/g, '')  // Remove special characters except common punctuation
                .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
                .replace(/[\r\n]+/g, ' ')  // Replace newlines with space
                .trim()  // Remove leading and trailing spaces
        }
    })
    // Create Document Entry
    pdfEntry.document = {
        documentName: document.name,
        documentType: document.type,
        text: pdfOutput.text.trim(),
        embedding: []
    }
    // Create Document Embedding
    const tokenizer = new GPT4Tokenizer({ type: 'gpt3' })
    const totalTokenCount = tokenizer.estimateTokenCount(pdfEntry.document.text);
    const embeddingLength = 1536
    const maxPerChunk = 8100

    const chunked = tokenizer.chunkText(
        pdfEntry.document.text, 
        Math.round(totalTokenCount / (Math.floor(totalTokenCount/maxPerChunk) + 1))
    )
    pdfEntry.document.embedding = (await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunked.map(({text}) => text)
    })).data.reduce((acc, {embedding}) => 
        acc.map((columnRunningSum, index) => columnRunningSum + embedding[index]), 
        new Array(embeddingLength).fill(0)
    ).map((columnRunningSum) => columnRunningSum / chunked.length)

    // Create Pages Embedding
    pdfEntry.pages = (await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: pdfEntry.pages.map(page => page.text),
        encoding_format: "float"
    })).data.map(({embedding}, idx) => ({
        ...pdfEntry.pages[idx],
        embedding,
    }))
    // Push to DynamoDB
    const documentId = uuidv4()
    await dynamodb.put({
        TableName: process.env.DOCUMENTS_TABLE,
        Item: {
            userId,
            documentId,
            ...pdfEntry.document
        }
    })
    pdfEntry.pages.forEach(async (page, idx) => {
        const pageId = uuidv4()
        await dynamodb.put({
            TableName: process.env.PAGES_TABLE,
            Item: {
                documentId,
                pageId,
                ...page
            }
        })
    })
    revalidateTag('documents') 
    // Update Researcher Profile Embedding
    const documentEmbeddings = (await dynamodb.query({
        TableName: process.env.DOCUMENTS_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    })).Items!.map(({embedding}) => embedding) as number[][]
    const meanVector = documentEmbeddings.reduce((acc: number[], embedding: number[]) =>
        acc.map((columnRunningSum: number, index) => columnRunningSum + embedding[index]), 
        new Array(embeddingLength).fill(0) as number[]
    ).map((columnRunningSum: number) => columnRunningSum / documentEmbeddings.length)
    await dynamodb.update({
        TableName: process.env.ORGANIZATIONS_TABLE,
        Key: {
            organizationId,
            userId
        },
        UpdateExpression: 'set embedding = :embedding',
        ExpressionAttributeValues: {
            ':embedding': meanVector
        }
    })
    revalidateTag('matches')
    // Add document to S3
    await s3.send(new PutObjectCommand({
        Bucket: process.env.DOCUMENTS_BUCKET,
        Key: `${organizationId}/${userId}/${documentId}`,
        Body: Buffer.from(await document.arrayBuffer()),
        ContentType: document.type
    }))
    
})