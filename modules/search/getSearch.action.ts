import { unwrapRefs } from "../shared/shared.utils";
import type { KeyowrdResponse } from "./keyword.type";
import type { SearchQueryRefs, SearchResponse } from "./search.type";

type AssetType = "all" | "3d" | "illustration" | "lottie" | "icon";

export const makeRequest = (assetType: AssetType, query: SearchQueryRefs) =>
	useFetch<SearchResponse>("/api/proxy/search", {
		query: {
			aggregate: true,
			asset: assetType,
			collections: true,
			extra_fields: true,
			keyword: true,
			lang: "en",
			page_type: assetType === "all" ? "all-asset" : assetType,
			per_page: 15,
			search_keywords: true,
			...unwrapRefs(query),
		},
		transform: (res: SearchResponse) => res,
		watch: [
			query.page,
			query.product_type,
			query.sort,
			query.price,
			query.query,
		],
	});

export const getKeyword = (assetType: AssetType, query: SearchQueryRefs) =>
	useFetch("/api/proxy/related-keywords", {
		query: {
			aggregate: true,
			asset: assetType === "all" ? "3d" : assetType,
			kbi: true,
			keyword: true,
			lang: "en",
			page_type: "search",
			per_page: 30,
			search_keywords: true,
			...unwrapRefs(query),
		},
		transform: (res: KeyowrdResponse) => res.response.related_keywords,
	});

const getData = async (type: AssetType, qParams: SearchQueryRefs) => {
	const allAssets = ["3d", "illustration", "lottie", "icon"];
	const requests =
		type === "all"
			? allAssets.map((assetType) =>
					makeRequest(assetType as AssetType, qParams),
				)
			: [makeRequest(type as AssetType, qParams)];

	const allResponse = await Promise.all(requests);

	const assetData: Record<string, Ref<SearchResponse | null>> = {};
	allAssets.forEach((data, idx) => {
		const res = allResponse[type === "all" ? idx : 0];

		if (res) {
			assetData[data] = res.data;
		}
	});

	return assetData;
};

export const getSearch = async (
	type: AssetType,
	query: {
		query: string;
		price: string;
		product_type: string;
		sort: string;
		page: number;
		iconscout_exclusive: string;
	},
) => {
	const queryRefs = {
		query: ref(query.query),
		price: ref(query.price),
		product_type: ref(query.product_type),
		sort: ref(query.sort),
		page: ref(query.page),
		iconscout_exclusive: ref(query.iconscout_exclusive),
	};

	const [{ data: keywords }, items] = await Promise.all([
		getKeyword(type, queryRefs),
		getData(type, queryRefs),
	]);

	return {
		keywords,
		items,
		getData,
	};
};
