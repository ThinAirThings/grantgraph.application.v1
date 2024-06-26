import { Database } from './Database';
import { LRUCache } from 'lru-cache';
import { CreateCollectionReq, DescribeCollectionReq, DropCollectionReq, GetCollectionStatisticsReq, LoadCollectionReq, ReleaseLoadCollectionReq, ShowCollectionsReq, HasCollectionReq, CreateAliasReq, DropAliasReq, AlterAliasReq, CompactReq, GetCompactionStateReq, GetCompactionPlansReq, GetReplicaReq, RenameCollectionReq, GetLoadingProgressReq, GetLoadStateReq, BoolResponse, ResStatus, CompactionResponse, DescribeCollectionResponse, GetCompactionPlansResponse, GetCompactionStateResponse, ShowCollectionsResponse, StatisticsResponse, ReplicasResponse, GetLoadingProgressResponse, GetLoadStateResponse, AlterCollectionReq, DataType } from '../';
/**
 * @see [collection operation examples](https://github.com/milvus-io/milvus-sdk-node/blob/main/example/Collection.ts)
 */
export declare class Collection extends Database {
    protected collectionInfoCache: LRUCache<string, DescribeCollectionResponse, unknown>;
    /**
     * Create a collection in Milvus.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | description | String | Collection description |
     *  | num_partitions | number | number of partitions allowed |
     *  | consistency_level | String | "Strong"(Milvus default) | "Session" | "Bounded"| "Eventually" | "Customized"; |
     *  | fields | <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/types/Collection.ts#L8" target="_blank">FieldType</a> | Field data |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property      | Description |
     *  | :-- | :-- |
     *  | error_code    | Error code number      |
     *  | reason        | Error cause          |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).createCollection({
     *    collection_name: 'my_collection',
     *    fields: [
     *      {
     *        name: "vector_01",
     *        description: "vector field",
     *        data_type: DataType.FloatVect,
     *        type_params: {
     *          dim: "8"
     *        }
     *      },
     *      {
     *        name: "age",
     *        data_type: DataType.Int64,
     *        autoID: true,
     *        is_primary_key: true,
     *        description: "",
     *      },
     *  ],
     *  });
     * ```
     */
    _createCollection(data: CreateCollectionReq): Promise<ResStatus>;
    /**
   * Check if a collection exists.
   *
   * @param data
   *  | Property | Type | Description |
   *  | :-- | :-- | :-- |
   *  | collection_name | String | Collection name |
   *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
   *
   * @returns
   *  | Property | Description |
   *  | :-- | :-- |
   *  | status | { error_code: number, reason: string } |
   *  | value | `true` or `false` |
  
   *
   * #### Example
   *
   * ```
   *  new milvusClient(MILUVS_ADDRESS).hasCollection({
   *     collection_name: 'my_collection',
   *  });
   * ```
   */
    hasCollection(data: HasCollectionReq): Promise<BoolResponse>;
    /**
   * List all collections or get collection loading status.
   *
   * @param data
   *  | Property | Type | Description |
   *  | :-- | :-- | :-- |
   *  | type(optional) | enum | All -> 0, Loaded -> 1 |
   *  | collection_names(optional) | String[] | If `type = Loaded`, Milvus will return `collection_names inMemory_percentages` |
   *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
  
   *
   * @returns
   * | Property | Description |
   *  | :-- | :-- |
   *  | status | { error_code: number, reason: string } |
   *  | data |  Contains collection name, ID , timestamp (UTC created time), and loadedPercentage (100 means loaded) |
   *
   *
   * #### Example
   *
   * ```
   *  new milvusClient(MILUVS_ADDRESS).showCollections();
   * ```
   */
    showCollections(data?: ShowCollectionsReq): Promise<ShowCollectionsResponse>;
    /**
     * Modify collection properties
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     * | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).alterCollection({
     *    collection_name: 'my-collection',
     *    properties: {"collection.ttl.seconds": 18000}
     * });
     * ```
     */
    alterCollection(data: AlterCollectionReq): Promise<ResStatus>;
    list_collections: (data?: ShowCollectionsReq) => Promise<ShowCollectionsResponse>;
    /**
     * Show the details of a collection, e.g. name, schema.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined       |
     *
     * @returns
     * | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | schema | Information of all fields in this collection |
     *  | collectionID  | Collection ID |
     *
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).describeCollection({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    describeCollection(data: DescribeCollectionReq): Promise<DescribeCollectionResponse>;
    /**
     * Show the statistics information of a collection.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined       |
     *
     * @returns
     * | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | stats | [{key: string, value: string}] |
     *  | data | Transform **stats** to { row_count: 0 } |
     *
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getCollectionStatistics({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    getCollectionStatistics(data: GetCollectionStatisticsReq): Promise<StatisticsResponse>;
    /**
     * Load collection data into query nodes, then you can do vector search on this collection.
     * It's async function, but we can use showCollections to check loading status.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :--- | :-- | :-- |
     *  | collection_name    | String | Collection name |
     *  | replica_number? | number | replica number |
     *  | resource_groups? | String[] | resource group names |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).loadCollection({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    loadCollection(data: LoadCollectionReq): Promise<ResStatus>;
    /**
     * Same function with loadCollection, but it's sync function.
     * Help to ensure this collection is loaded.
     *
     * @param data
     *  | Property | Type  | Description |
     *  | :--- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | replica_number？ | number | replica number |
     *  | resource_groups？ | String[] | resource group |
     *  | timeout？ | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).loadCollectionSync({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    loadCollectionSync(data: LoadCollectionReq): Promise<ResStatus>;
    /**
     * Release a collection from cache to reduce cache usage.
     * Note that you cannot search while the corresponding collection is unloaded.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined       |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).releaseCollection({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    releaseCollection(data: ReleaseLoadCollectionReq): Promise<ResStatus>;
    /**
     * Rename a collection
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | old collection name |
     *  | new_collection_name | String | new collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined       |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).renameCollection({
     *    collection_name: 'my_collection',
     *    new_collection_name: 'my_new_collection'
     *  });
     * ```
     */
    renameCollection(data: RenameCollectionReq): Promise<ResStatus>;
    /**
     * Drop a collection. Note that this drops all data in the collection.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined. |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).dropCollection({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    dropCollection(data: DropCollectionReq): Promise<ResStatus>;
    drop_collection: (data: DropCollectionReq) => Promise<ResStatus>;
    /**
     * Create collection alias, then you can use alias instead of collection_name when you do vector search
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | alias | String | alias name |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined. |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).createAlias({
     *    alias: 'my_collection_alis',
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    createAlias(data: CreateAliasReq): Promise<ResStatus>;
    /**
     * Drop a collection alias
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | alias | String | alias name |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined. |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).dropAlias({
     *    alias: 'my_collection_alis',
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    dropAlias(data: DropAliasReq): Promise<ResStatus>;
    /**
     * alter a collection alias
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | alias | String | alias name |
     *  | collection_name | String | Collection name |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined. |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | error_code | Error code number |
     *  | reason | Error cause |
     *
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).alterAlais({
     *    alias: 'my_collection_alis',
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    alterAlias(data: AlterAliasReq): Promise<ResStatus>;
    /**
     * Do compaction for the collection.
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | String | The collection name to compact |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | compactionID | compaction ID |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).compact({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    compact(data: CompactReq): Promise<CompactionResponse>;
    /**
     * Get compaction states of a targeted compaction id
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | compactionID | number or string | the id returned by compact |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined       |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | state | the state of the compaction |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getCompactionState({
     *    compactionID: compactionID,
     *  });
     * ```
     */
    getCompactionState(data: GetCompactionStateReq): Promise<GetCompactionStateResponse>;
    /**
     * Get compaction states of a targeted compaction id
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | compactionID | number or string | the id returned by compact |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | state | the state of the compaction |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getCompactionStateWithPlans({
     *    compactionID: compactionID,
     *  });
     * ```
     */
    getCompactionStateWithPlans(data: GetCompactionPlansReq): Promise<GetCompactionPlansResponse>;
    /**
     * Get replicas
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collectionID | number or string | the id returned by compact |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | ReplicaInfo[] | replica info array |
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getReplicas({
     *    collectionID: collectionID,
     *  });
     *
     * ```
     *
     * Return
     * ```
     * {
     *  replicas: [
     *     {
     *      partition_ids: [Array],
     *      shard_replicas: [Array],
     *      node_ids: [Array],
     *      replicaID: '436724291187770258',
     *      collectionID: '436777253933154305'
     *    }
     *  ],
     *  status: { error_code: 'Success', reason: '' }
     * }
     * ```
     */
    getReplicas(data: GetReplicaReq): Promise<ReplicasResponse>;
    /**
     * Get loading progress of a collection
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | string | the name of the collection |
     *  | timeout? | number | An optional duration of time in millisecond to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | total_row_num | the total number of rows in the collection |
     *  | total_loaded_row_num | the total number of loaded rows in the collection |
     *
     * @throws {Error} if `collection_name` property is not present in `data`
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getLoadingProgress({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    getLoadingProgress(data: GetLoadingProgressReq): Promise<GetLoadingProgressResponse>;
    /**
     * Get the loading state of a collection
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | string | the name of the collection |
     *  | timeout? | number | An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | status | { error_code: number, reason: string } |
     *  | state | the loading state of the collection |
     *
     * @throws {Error} if `collection_name` property is not present in `data`
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getLoadState({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    getLoadState(data: GetLoadStateReq): Promise<GetLoadStateResponse>;
    listCollections: (data?: ShowCollectionsReq) => Promise<ShowCollectionsResponse>;
    /**
     * Get the primary key field name
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | string | the name of the collection |
     *  | timeout? | number | An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | pkfield | the primary key field name |
     *
     * @throws {Error} if `collection_name` property is not present in `data`
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getPkFieldName({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    getPkFieldName(data: DescribeCollectionReq): Promise<string>;
    /**
     * Get the primary key field type
     *
     * @param data
     *  | Property | Type | Description |
     *  | :-- | :-- | :-- |
     *  | collection_name | string | the name of the collection |
     *  | timeout? | number | An optional duration of time in milliseconds to allow for the RPC. If it is set to undefined, the client keeps waiting until the server responds or an error occurs. Default is undefined |
     *
     * @returns
     *  | Property | Description |
     *  | :-- | :-- |
     *  | pkFieldType | the primary key field type |
     *
     * @throws {Error} if `collection_name` property is not present in `data`
     *
     * #### Example
     *
     * ```
     *  new milvusClient(MILUVS_ADDRESS).getPkFieldType({
     *    collection_name: 'my_collection',
     *  });
     * ```
     */
    getPkFieldType(data: DescribeCollectionReq): Promise<keyof typeof DataType>;
}
