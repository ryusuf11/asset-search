import type { ResponseData } from "../shared/shared.type";

export type SearchResponse = ResponseData<SearchResponseData>;

export interface SearchResponseData {
	keyword: Keyword;
	translation: Translation;
	items?: Items;
	packs?: Packs;
	image: string;
	image_url: string;
	aggregations: Aggregations;
	related_tags: string[];
	gsc_keywords: string[];
}

export interface Packs {
	current_page: number;
	data: Daum[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string;
	path: string;
	per_page: number;
	prev_page_url: string;
	to: number;
	total: number;
}

export interface Keyword {
	id: number;
	visibility: boolean;
	description: string;
	long_description: string;
	story: string;
	sort: string;
	is_nsfw: boolean;
	is_brandfetch: string;
	meta_tags: MetaTags;
	name: string;
	slug: string;
	lang: string;
}

export interface MetaTags {
	faqs: string[];
	title: string;
	description: string;
	canonical_url: string;
}

export interface Translation {
	en: string;
	pt: string;
	fr: string;
	es: string;
	ko: string;
	it: string;
	de: string;
	ja: string;
}

export interface Items {
	current_page: number;
	data: Daum[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string;
	path: string;
	per_page: number;
	prev_page_url: string;
	to: number;
	total: number;
}

export interface Daum {
	id: number;
	uuid: string;
	asset: string;
	raw_item_id: number;
	pack_id: number;
	user_id: number;
	custom_mockup: boolean;
	mockup_preview: boolean;
	price: number;
	priority: number;
	width: number;
	height: number;
	size: number;
	style_id: string;
	license_id: number;
	status: string;
	created_at: string;
	modified_at: string;
	deleted_at: string;
	name: string;
	slug: string;
	lang: string;
	liked_by_user: boolean;
	is_premium: boolean;
	payable_price: number;
	licenses: License[];
	urls: Urls;
	canonical_url: string;
	preview_files: PreviewFile[];
	additional_formats: string[];
	additional_informations: AdditionalInformations;
	formats: Format[];
	color_codes: ColorCode[];
	contributor: Contributor;
	style: string;
	tags: Tag[];
	collections: string[];
	items: CustomItem[];
}

export interface CustomItem {
	asset: string;
	created_at: string;
	custom_mockup: boolean;
	formats: Format[];
	id: number;
	lang: string;
	license_id: number;
	mockup_preview: boolean;
	modified_at: string;
	name: string;
	pack_id: number;
	price: number;
	priority: number;
	raw_item_id: number;
	slug: string;
	urls: Urls;
	user_id: number;
	uuid: string;
}

export interface License {
	id: number;
	name: string;
	description: string;
	link: string;
	price: number;
	payable_price: number;
	attribution_required: number;
	downloaded_by_user: boolean;
	is_subscription: boolean;
}

export interface Urls {
	thumb: string;
	preview: string;
	original?: string;
	gif?: string;
	mp4?: string;
	lottie?: string;
	preview_image?: string;
	preview_mockup?: string;
	custom_preview?: string;
	png_128?: string;
	png_256?: string;
	png_512?: string;
}

export interface PreviewFile {
	preview: string;
	thumb: string;
}

export interface AdditionalInformations {
	nsfw: boolean;
	category: string;
	allowed_usage: string;
	iconscout_exclusive: boolean;
	background_type?: string;
}

export interface Format {
	id: number;
	name: string;
	mime_type: string;
}

export interface ColorCode {
	decimal_color: number;
	color_id: number;
}

export interface Contributor {
	id: number;
	uuid: string;
	first_name: string;
	last_name: string;
	company?: string;
	username: string;
	description?: string;
	designation: string[];
	created_at: string;
	updated_at: string;
	deleted_at: string;
	items_count: number;
	packs_count: number;
	followers_count: number;
	sales_count: number;
	followed_by_user: boolean;
	name: string;
	urls: Urls2;
}

export interface Urls2 {
	small: string;
	normal: string;
	large: string;
}

export interface Tag {
	id: number;
	orderable_id: number;
	name: string;
	slug: string;
	lang: string;
}

export interface Aggregations {
	price: Price;
	assets: Assets;
	styles: object;
	formats: Format2[];
	categories: Category[];
	orientation: string[];
	curated_categories: CuratedCategory[];
	iconscout_exclusive: boolean;
	verified_gltf: boolean;
}

export interface Price {
	all: number;
	free: number;
	premium: number;
}

export interface Assets {
	icons_count: number;
	illustrations_count: number;
	lotties_count: number;
	"3ds_count": number;
	photos_count: number;
}

export interface Format2 {
	name: string;
	slug: string;
	count: number;
}

export interface Category {
	id: number;
	category_id?: number;
	keyword: string;
	name: string;
	slug: string;
	lang: string;
	count: number;
}

export interface CuratedCategory {
	name: string;
	slug: string;
	count: number;
}

export type SearchQuery = {
	page: number;
	query: string;
	price: string;
	product_type: string;
	sort: string;
	iconscout_exclusive: string;
};

export type SearchQueryRefs = {
	[K in keyof SearchQuery]: Ref<SearchQuery[K]>;
};
