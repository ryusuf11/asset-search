<template>
  <Navbar />
  <Header :title="title" :subtitle="description" />

  <div class="d-flex" style="gap: 40px;">
    <Filter :keywords="unref(keywords) || []" />

    <template v-if="assetLoading">
      <AssetSkeleton />
    </template>
    <template v-else>
      <AssetContainer :isGuest="isGuest" :fetchItem="fetchItem" :toggleGuest="toggleGuest" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Navbar } from '#components';
import { getKeyword } from '~/modules/search/getSearch.action';
import type { SearchResponse } from '~/modules/search/search.type';

const route = useRoute();
const router = useRouter();

const queryParams = reactive({
  query: route.params.search?.toString() || '',
  price: route.query.price?.toString() || 'all',
  product_type: route.query.product_type?.toString() || 'item',
  sort: route.query.sort?.toString() || 'popular',
  iconscout_exclusive: route.query.iconscout_exclusive?.toString() || 'false',
  page: 1,
});

const { data: searchData, status } = useAsyncData(
  'search',
  async () => {
    const { data: keywords } = await getKeyword('3d', {
      query: ref(queryParams.query),
      price: ref(queryParams.price),
      product_type: ref(queryParams.product_type),
      sort: ref(queryParams.sort),
      page: ref(queryParams.page),
      iconscout_exclusive: ref(queryParams.iconscout_exclusive),
    })
    return { keywords };
  },
  {
    watch: [
      () => queryParams.query,
      () => queryParams.price,
      () => queryParams.product_type,
      () => queryParams.sort,
      () => queryParams.iconscout_exclusive,
    ],
  }
);

const searchPage = ref(1)
const searchPrice = ref(queryParams.price)
const searchType = ref(queryParams.product_type)
const searchSort = ref(queryParams.sort)
const searchExclusive = ref(queryParams.iconscout_exclusive)
const { data: rawItem, status: statusSearch, refresh: getSearchItem } = useFetch("/api/proxy/search", {
  query: {
    aggregate: true,
    asset: '3d',
    collections: true,
    extra_fields: true,
    keyword: true,
    lang: "en",
    page_type: '3d',
    per_page: 50,
    search_keywords: true,
    query: queryParams.query,
    price: searchPrice,
    product_type: searchType,
    sort: searchSort,
    page: searchPage,
    iconscout_exclusive: searchExclusive,
  },
  immediate: false,
  transform: (res: SearchResponse) => res,
});

const isFetching = computed(() => statusSearch.value === 'pending');
const isGuest = ref(true)

const fetchItem = computed(() => async (pageNum: number) => {
  // Wait until any previous request finishes
  while (isFetching.value) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  // Update the reactive dependency that triggers the request
  searchPage.value = pageNum;

  return rawItem.value;
})

watch(queryParams, (newVal) => {
  router.push({
    query: {
      price: newVal.price,
      product_type: newVal.product_type,
      sort: newVal.sort,
      iconscout_exclusive: newVal.iconscout_exclusive,
    },
  });
});

watch(
  () => route.query,
  (newQuery) => {
    queryParams.price = newQuery.price?.toString() || 'all';
    queryParams.product_type = newQuery.product_type?.toString() || 'item';
    queryParams.sort = newQuery.sort?.toString() || 'popular';
    queryParams.iconscout_exclusive = newQuery.iconscout_exclusive?.toString() || 'false';

    resetSearchItem()
  }
);

const resetSearchItem = () => {
  searchPrice.value = queryParams.price;
  searchType.value = queryParams.product_type;
  searchSort.value = queryParams.sort;
  searchExclusive.value = queryParams.iconscout_exclusive;
  searchPage.value = 1;
}

onMounted(() => {
  getSearchItem()
})

const keywords = computed(() => searchData.value?.keywords || []);
const assetLoading = computed(() => status.value === 'pending');

const totalItems = computed(() => {
  return rawItem.value?.response?.aggregations?.assets?.['3ds_count'] || 0;
})

const toggleGuest = async () => {
  isGuest.value = false;

  nextTick(() => {
    resetSearchItem()
  })
}

const title = computed(() => {
  return `${totalItems.value} Limit 3D Illustrations`
})

const description = computed(() => {
  return `${totalItems.value} 3Ds exclusively selected by our designer community.`
})

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: route.params.search?.toString() },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description }
  ],
});
</script>