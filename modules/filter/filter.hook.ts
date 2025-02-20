import { assetLink } from "../constants/assetLink";

export const useFilterData = () => {
	const route = useRoute();
	const query = route.query;
	const productType = ref(query.product_type?.toString() || "item");
	const price = ref(query.price?.toString() || "all");
	const sort = ref(query.sort?.toString() || "popular");
	const search = ref(route.params.search?.toString() || "all");
	const iconExclusive = ref(query.iconscout_exclusive?.toString() || "false");
	const assetType = ref(
		assetLink.find((item) => route.path.includes(item.link))?.key || "all",
	);

	return {
		productType,
		price,
		sort,
		assetType,
		search,
		iconExclusive,
	};
};
