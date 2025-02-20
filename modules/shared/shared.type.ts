export interface ResponseData<T> {
	status: string;
	response: Pick<T, keyof T>;
	meta: MetaData;
	elements: string;
	message: string;
}

export interface MetaData {
	total_time: number;
	db_query_time: number;
	db_query_count: number;
}

export type AssetItemType = "asset" | "icon" | "lottie" | "mp4";
