<template>
  <Navbar />
  <Header :title="title" :subtitle="description" />

  <div class="d-flex" style="gap: 40px;">
    <Filter :keywords="unref(keywords) || []" />

    <template v-if="assetLoading">
      <AssetSkeleton />
    </template>
    <template v-else>
      <div class="d-flex flex-column" style="width: calc(100vw - 340px)">
        <CategorySlider :keywords="unref(keywords) || []" />
        <AllAssetPanel :items="unref(items)" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AllAssetPanel, AssetSkeleton, CategorySlider, Filter, Header, Navbar } from '#components';
import { getSearch } from '~/modules/search/getSearch.action';

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
    const { keywords, items } = await getSearch('all', {
      query: queryParams.query,
      price: queryParams.price,
      product_type: queryParams.product_type,
      sort: queryParams.sort,
      page: queryParams.page,
      iconscout_exclusive: queryParams.iconscout_exclusive,
    });
    return { keywords, items };
  },
  {
    watch: [
      () => queryParams.query,
      () => queryParams.price,
      () => queryParams.product_type,
      () => queryParams.sort,
      () => queryParams.page,
      () => queryParams.iconscout_exclusive,
    ],
  }
);

watch(queryParams, (newVal) => {
  router.push({
    query: {
      price: newVal.price,
      product_type: newVal.product_type,
      sort: newVal.sort,
      page: newVal.page,
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
    queryParams.page = Number(newQuery.page) || 1;
    queryParams.iconscout_exclusive = newQuery.iconscout_exclusive?.toString() || 'false';
  }
);

const keywords = computed(() => searchData.value?.keywords || []);
const items = computed(() => searchData.value?.items || {});
const assetLoading = computed(() => status.value === 'pending');

const totalItems = computed(() => {
  const assets = unref(items.value['3d'])?.response.aggregations.assets
  const total = (assets?.icons_count ?? 0) + (assets?.['3ds_count'] ?? 0) + (assets?.illustrations_count ?? 0) + (assets?.lotties_count ?? 0) + (assets?.photos_count ?? 0);
  return total
})

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
