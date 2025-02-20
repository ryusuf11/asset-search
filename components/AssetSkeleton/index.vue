<template>
  <div :class="styles.assetSection">
    <div v-for="i in 25" :key="i" :class="classItems" />
  </div>
</template>

<script setup lang="ts">
import styles from './AssetSkeleton.module.scss'

const props = defineProps({
  variant: {
    type: String,
    default: 'asset'
  }
})

const classItems = computed(() => ({
  [styles.assetSection__item]: true,
  [styles['assetSection__item--icon']]: props.variant === 'icon'
}))

</script>