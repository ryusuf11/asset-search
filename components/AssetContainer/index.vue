<template>
  <div :class="styles.assetContainer" class="items-container">
    <ClientOnly>
      <Grid :key="`rerender-${props.isGuest}`" :length="totalItem" :pageSize="50" :pageProvider="pageProvider"
        class="grid" :class="{
          [styles.assetContainer__items]: true,
          [styles['assetContainer__items-icon']]: assetType === 'icon',
        }">
        <template #probe>
          <div class="item">
            probe
          </div>
        </template>

        <template v-slot:placeholder="{ index, style }">
          <div :class="`${assetItemStyle.assetItem} ${assetItemStyle.assetItem__skeleton}`" :style="style" />
        </template>

        <template #default="{ item, style }">
          <div :style="style">
            <AssetItem :asset="getItem(assetType, item)" :jsonFile="jsonFile" />
          </div>
        </template>
      </Grid>

      <template v-if="props.isGuest">
        <div :class="styles.guestRestriction">
          <div :class="styles.guestRestriction__container">
            <p :class="styles.guestRestriction__title">View all Limit 3D Illustrations</p>
            <button class="button" @click="toggleGuest">Get Started - It's Free</button>
            <div :class="styles.guestRestriction__login">
              Already have an account? <span>Log In </span>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Daum, SearchResponse, SearchResponseData } from "~/modules/search/search.type";
import styles from "./AssetContainer.module.scss";
import assetItemStyle from '../AssetItem/AssetItem.module.scss'
import type { AssetItemType } from "~/modules/shared/shared.type";
import Grid from 'vue-virtual-scroll-grid'

const props = defineProps({
  fetchItem: {
    type: Function as PropType<(page: number) => Promise<SearchResponse | null>>,
    required: true,
  },
  assetType: {
    type: String as PropType<AssetItemType>,
    required: false,
    default: "asset",
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
  toggleGuest: {
    type: Function as PropType<() => void>,
    required: false,
  },
  jsonFile: {
    type: Boolean,
    default: false,
  }
});

const page = ref(1)
const totalItem = ref(50)

const getItems = (items: Pick<SearchResponseData, keyof SearchResponseData> | undefined) => {
  const sourceItems = unref(items)
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

    if (props.jsonFile && item.urls.original) {
      assetUrl = item.urls.original
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

const pageProvider = computed(() => async (pageNum: number) => {
  if (props.isGuest && pageNum === 1) {
    totalItem.value = 50

    return []
  }

  page.value = pageNum + 1

  const item = await props.fetchItem(pageNum + 1)
  const items = getItems(item?.response)

  totalItem.value = item?.response?.items?.total || item?.response?.packs?.total || 0

  return items
})

watch(() => props.isGuest, () => {
  totalItem.value = 1000
})
</script>