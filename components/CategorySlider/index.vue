<template>
  <div class="sliderWrapper">
    <button class="arrow left" @click="scrollLeft">
      <Icon name="icon:arrow-rounded-left" size="36px" />
    </button>

    <div class="sliderContainer" ref="sliderContainer">
      <NuxtLink v-for="keyword in keywords" :key="keyword.id" :to="`/${assetType}/${keyword.slug}`" class="sliderItem">
        <button class="button">
          {{ keyword.name }}
        </button>
      </NuxtLink>
    </div>

    <button class="arrow right" @click="scrollRight">
      <Icon name="icon:arrow-rounded-right" size="36px" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFilterData } from '~/modules/filter/filter.hook'
import type { RelatedKeyword } from '~/modules/search/keyword.type'

const { assetType } = useFilterData()

defineProps({
  keywords: {
    type: Array as PropType<RelatedKeyword[]>,
    default: () => []
  },
})

const sliderContainer = ref<HTMLElement | null>(null)

const scrollAmount = 300

const scrollLeft = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }
}

// Scroll right function
const scrollRight = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }
}
</script>

<style lang="scss" scoped>
.sliderWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.sliderContainer {
  display: flex;
  padding: 16px 0;
  overflow-x: auto;
  width: 100%;
  gap: 10px;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
}

.sliderItem {
  flex: 0 0 auto;

  .button {
    background-color: #ffffff;
    border: 1px solid #e4e9f2;
    padding: 7px 12px;
    border-radius: 5px;
    color: #636c7e;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    text-transform: capitalize;
    white-space: nowrap;
  }
}

.arrow {
  position: absolute;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  color: #636c7e;
  transition: color 0.3s;
  padding: 0;

  &.left {
    left: -14px;
  }

  &.right {
    right: -14px;
  }
}
</style>
