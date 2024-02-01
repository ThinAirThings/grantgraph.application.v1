import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';
// Connect to Milvus
export const zilliz = new MilvusClient({ 
    address: process.env.ZILLIZ_ENDPOINT!,
    token: process.env.ZILLIZ_API_KEY!
});