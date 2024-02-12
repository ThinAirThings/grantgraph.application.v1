import { dynamodb } from "@/src/libs/aws/dynamodb.client";
import { unstable_cache as cache } from 'next/cache';
import { DocumentEntry } from "../app/(dashboard)/dashboard/knowledge-base/page";

export const getCachedDocuments = cache(async (userId: string) => (await dynamodb.query({
    TableName: process.env.DOCUMENTS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
        ':userId': userId
    }})).Items?.reduce((documents: Record<string, DocumentEntry>, item) => {
        documents[item.documentId] = {
            documentId: item.documentId,
            documentName: item.documentName,
            documentType: item.documentType,
        }
        return documents
    }
, {}), ['documents'], {
    tags: ['documents'],
    revalidate: 60,
})