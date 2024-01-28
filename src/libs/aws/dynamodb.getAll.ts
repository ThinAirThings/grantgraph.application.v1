import { GrantEntry } from "@/src/types/GrantEntry"
import { dynamodb } from "./dynamodb.client"



export const getAllDynamodbItems = async (tableName: string) => {
    const items: any[] = []
    let lastEvaluatedKey: any = undefined
    do {
        const result = await dynamodb.scan({
            TableName: tableName,
            ExclusiveStartKey: lastEvaluatedKey
        })
        items.push(...result.Items??[])
        lastEvaluatedKey = result.LastEvaluatedKey
    } while (lastEvaluatedKey)
    return items as GrantEntry[]
}