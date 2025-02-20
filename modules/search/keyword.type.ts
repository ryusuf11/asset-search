import type { ResponseData } from "../shared/shared.type";

export type KeyowrdResponse = ResponseData<KeyowrdResponseData>;

export interface KeyowrdResponseData {
	gsc_keywords: GscKeyword[];
	related_keywords: RelatedKeyword[];
	trending_keywords: TrendingKeyword[];
}

export interface GscKeyword {
	id: number;
	name: string;
	slug: string;
	lang: string;
}

export interface RelatedKeyword {
	id: number;
	name: string;
	slug: string;
	lang: string;
}

export interface TrendingKeyword {
	id: number;
	name: string;
	slug: string;
	lang: string;
}
