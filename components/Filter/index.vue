<template>
  <div>
    <div ref="sentinel" />
    <div ref="filterSection" :class="styles.filterSection">
      <div :class="styles.filterSection__item">
        <div class="d-flex justify-content-between align-items-center w-100">
          <div :class="styles.filterSection__title">Iconscout Exclusive</div>
          <div class="form-check form-switch">
            <input class="form-check-input switch" type="checkbox" :checked="iconExclusive === 'true'"
              @click="() => router.push({ query: { ...route.query, iconscout_exclusive: iconExclusive !== 'true' ? 'true' : 'false' } })">
          </div>
        </div>
      </div>

      <div :class="styles.filterSection__item">
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-content-between align-items-center w-100 cursor-pointer" v-b-toggle.collapse-asset>
            <div :class="styles.filterSection__title">Asset</div>
            <Icon name="lucide:chevron-down" />
          </div>

          <BCollapse id="collapse-asset" visible>
            <BFormRadioGroup name="asset-filter" :class="styles.filterSection__radios" v-model="assetType"
              @update:model-value="() => router.push({ path: `/${assetType}/${search}` })">
              <BFormRadio v-for="asset in assetLink" :key="asset.key" :value="asset.key" class="radio">
                {{ asset.title }}
              </BFormRadio>
            </BFormRadioGroup>
          </BCollapse>
        </div>
      </div>

      <div :class="styles.filterSection__item">
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-content-between align-items-center w-100 cursor-pointer" v-b-toggle.collapse-price>
            <div :class="styles.filterSection__title">Price</div>
            <Icon name="lucide:chevron-down" />
          </div>

          <BCollapse id="collapse-price" visible>
            <BFormRadioGroup name="price-filter" :class="styles.filterSection__radios" v-model="price"
              @update:model-value="() => router.push({ query: { ...route.query, price: price } })">
              <BFormRadio value="free" class="radio">Free</BFormRadio>
              <BFormRadio value="premium" class="radio">Premium</BFormRadio>
              <BFormRadio value="all" class="radio">All</BFormRadio>
            </BFormRadioGroup>
          </BCollapse>
        </div>
      </div>

      <div :class="styles.filterSection__item">
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-content-between align-items-center w-100 cursor-pointer" v-b-toggle.collapse-view>
            <div :class="styles.filterSection__title">View</div>
            <Icon name="lucide:chevron-down" />
          </div>

          <BCollapse id="collapse-view" visible>
            <BFormRadioGroup name="view-filter" :class="styles.filterSection__radios" v-model="productType"
              @update:model-value="() => router.push({ query: { ...route.query, product_type: productType } })">
              <BFormRadio value="pack" class="radio">Pack</BFormRadio>
              <BFormRadio value="item" class="radio">Individual</BFormRadio>
            </BFormRadioGroup>
          </BCollapse>
        </div>
      </div>

      <div :class="styles.filterSection__item">
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-content-between align-items-center w-100 cursor-pointer" v-b-toggle.collapse-sort>
            <div :class="styles.filterSection__title">Sort by</div>
            <Icon name="lucide:chevron-down" />
          </div>

          <BCollapse id="collapse-sort" visible>
            <BFormRadioGroup name="sort-filter" :class="styles.filterSection__radios" v-model="sort"
              @update:model-value="() => router.push({ query: { ...route.query, sort: sort } })">
              <BFormRadio value="popular" class="radio">Popular</BFormRadio>
              <BFormRadio value="latest" class="radio">Latest</BFormRadio>
              <BFormRadio value="featured" class="radio">Featured</BFormRadio>
            </BFormRadioGroup>
          </BCollapse>
        </div>
      </div>

      <div :class="styles.filterSection__item">
        <div class="d-flex flex-column w-100">
          <div class="d-flex justify-content-between align-items-center w-100 cursor-pointer"
            v-b-toggle.collapse-keyword>
            <div :class="styles.filterSection__title">Categories</div>
            <Icon name="lucide:chevron-down" />
          </div>

          <BCollapse id="collapse-keyword" visible>
            <div class="d-flex flex-wrap gap-2" style="margin-top: 15px;">
              <NuxtLink v-for="keyword in keywords" :key="keyword.id" :to="`/${assetType}/${keyword.slug}`">
                <button :class="styles.filterSection__buttons">
                  {{ keyword.name }}
                </button>
              </NuxtLink>
            </div>
          </BCollapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RelatedKeyword } from '~/modules/search/keyword.type'
import styles from './Filter.module.scss'
import { assetLink } from '~/modules/constants/assetLink'
import { useFilterData } from '~/modules/filter/filter.hook'

defineProps({
  keywords: {
    type: Array<RelatedKeyword>,
    default: () => []
  },
})

const router = useRouter()
const route = useRoute()
const { assetType, price, productType, sort, search, iconExclusive } = useFilterData()

const filterSection = useTemplateRef<HTMLElement | null>('filterSection')
const sentinel = useTemplateRef<HTMLElement | null>('sentinel')
const isSticky = ref(false)

onMounted(() => {
  if (!sentinel.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      isSticky.value = !entry.isIntersecting
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
  )

  observer.observe(sentinel.value)

  onBeforeUnmount(() => {
    if (sentinel.value) observer.unobserve(sentinel.value)
  })
})

watch(isSticky, (value) => {
  if (filterSection.value) {
    filterSection.value.classList.toggle(`${styles['filterSection--sticky']}`, value)
  }
})
</script>