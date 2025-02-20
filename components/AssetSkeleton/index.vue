<template>
  <div :class="classItems">
    <div v-for="i in 25" :key="i" :class="styles.assetSection__item" />
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
  [styles.assetSection]: true,
  [styles['assetSection--icon']]: props.variant === 'icon'
}))

</script>