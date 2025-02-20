<template>
  <div class="d-flex flex-column w-100 items-container" style="padding-bottom: 40px;">
    <div :class="styles.assetPanel" v-for="(asset, idx) in assetList" :key="`asset-panel-${asset.key}`">
      <h4 :class="styles.assetPanel__title" :style="idx === 0 && 'padding-top:0px;'">
        {{ route.params.search }} {{ asset.title }}
      </h4>

      <div :class="{
        [styles.assetPanel__items]: true,
        [styles['assetPanel__items-icon']]: asset.key === 'icon',
      }">
        <AssetItem v-for="item in getItems(asset.key)" :key="`asset-item-${asset.key}`"
          :asset="getItem(asset.key, item)" />

        <AssetItem :isMore="true" :asset="{
          name: 'View more',
          type: asset.key as AssetItemType,
          url: `/more.png`,
        }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { allAssets } from "~/modules/constants/assetLink";
import styles from "./AllAssetPanel.module.scss";
import type { Daum, SearchResponse } from "~/modules/search/search.type";
import type { AssetItemType } from "~/modules/shared/shared.type";

const props = defineProps({
  items: {
    type: Object as PropType<
      Record<string, Ref<SearchResponse | null, SearchResponse | null>>
    >,
    required: true,
  },
});

const assetList = ref(allAssets);
const route = useRoute();

const getItems = (assetType: string) => {
  const sourceItems = unref(props.items[assetType])?.response
  const results = sourceItems?.items ? sourceItems?.items?.data : sourceItems?.packs?.data
  return results ?? []
}

const getItem = (assetType: string, item: Daum) => {
  let itemType: AssetItemType = "asset";
  let assetUrl = item.urls.thumb

  if (assetType === "icon") {
    itemType = "icon";
    assetUrl = item.urls?.png_256 ?? '';
  } else if (assetType === "lottie") {
    if (item.urls.lottie) {
      itemType = "lottie";
      assetUrl = item.urls.lottie
    } else {
      itemType = "mp4";

      if (item.urls.mp4) {
        assetUrl = item.urls.mp4
      }
    }
  }

  if (!assetUrl) {
    assetUrl = item.urls?.custom_preview || item.urls?.preview_mockup || ''
  }

  if (item.items && item.items.length > 0) {
    assetUrl = item.items[0].urls.thumb
  }

  return {
    type: itemType,
    url: assetUrl,
    name: item.name,
  };
};
</script>
