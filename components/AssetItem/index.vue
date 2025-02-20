<template>
  <a href="#" :title="asset.name" :class="{
    [styles.assetItem]: true,
    [styles['assetItem-icon']]: asset.type === 'icon',
  }" @mouseover="showOverlay = true" @mouseleave="showOverlay = false">
    <template v-if="!isMore">
      <BOverlay :show="showOverlay" bg-color="rgba(46,51,76,0.1)" rounded="2" blur="none" :no-center="true"
        class="h-100">
        <div :class="styles.assetItem__container">
          <template v-if="asset.type === 'lottie' && !jsonFile">
            <DotLottieVue style="height: 190px; width: 190px" autoplay loop :src="asset.url" :alt="asset.name" />
          </template>
          <template v-if="asset.type === 'lottie' && jsonFile">
            <lottie-player autoplay loop style="height: 190px; width: 190px" :src="asset.url" :alt="asset.name"
              speed="1" debug></lottie-player>
          </template>
          <template v-if="asset.type === 'asset'">
            <NuxtPicture :src="asset.url" width="190px" height="190px" :alt="asset.name" format="webp"
              :class="styles.assetItem__picture" />
          </template>
          <template v-if="asset.type === 'icon'">
            <NuxtPicture :src="asset.url" width="72px" height="72px" :alt="asset.name" format="webp"
              :class="styles.assetItem__picture" />
          </template>
          <template v-if="asset.type === 'mp4'">
            <div :class="styles.assetItem__video">
              <video :src="asset.url" autoplay loop muted playsinline loading="lazy"></video>
            </div>
          </template>
        </div>

        <template #overlay>
          <div :class="styles.assetItem__overlay">
            <button v-b-tooltip="'Add to collection'" :class="styles.assetItem__overlay_button"
              style="top: 12px; right: 12px">
              <Icon name="icon:save-collection" size="24" />
            </button>
            <button v-b-tooltip="'Download'" :class="styles.assetItem__overlay_button"
              style="bottom: 12px; right: 12px">
              <Icon name="icon:arrow-download" size="24" />
            </button>
            <p :class="styles.assetItem__overlay_label">{{ asset.name }}</p>
          </div>
        </template>
      </BOverlay>
    </template>
    <template v-if="isMore">
      <div :class="styles.assetItem__more">
        <NuxtImg :src="asset.url" width="190px" height="190px" :alt="asset.name" format="webp" />
        <div :class="styles.assetItem__more_overlay">
          <div :class="styles.assetItem__more_label">
            View More
            <Icon name="icon:arrow-more" size="20px" />
          </div>
        </div>
      </div>
    </template>
  </a>
</template>

<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import type { AssetItemType } from "~/modules/shared/shared.type";
import styles from "./AssetItem.module.scss";

defineProps({
  asset: {
    type: Object as PropType<{
      type: AssetItemType;
      url: string;
      name: string;
    }>,
    required: true,
  },
  isMore: {
    type: Boolean,
    default: false
  },
  jsonFile: {
    type: Boolean,
    default: false,
  }
});

const showOverlay = ref(false);
</script>
