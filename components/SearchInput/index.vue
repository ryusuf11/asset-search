<template>
  <div :class="styles.searchInput">
    <div class="d-flex align-items-center">
      <BFormSelect v-model="assetType" :options="options" :class="styles.searchInput__dropdown">
      </BFormSelect>
      <Icon name="lucide:chevron-down" size="16px" />
    </div>

    <div :class="styles.searchInput__divider" />

    <Icon name="lucide:search" size="24px" />
    <input v-model="search" type="search" placeholder="Search from 8 Million+ assets" />
  </div>
</template>

<script setup>
import styles from './SearchInput.module.scss';
import debounce from 'lodash.debounce'

const route = useRoute()
const router = useRouter()
const assetType = ref(route.path.split('/')[1].toString() ?? 'all');

const options = ref([
  { text: 'All', value: 'all' },
  { text: '3D', value: '3d' },
  { text: 'Animations', value: 'lottie' },
  { text: 'Illustrations', value: 'illustrations' },
  { text: 'Icons', value: 'icons' },
])

const search = ref(route.params.search?.toString() ?? '');

const debouncedPush = debounce((url) => {
  router.push(url);
}, 500);

watch(() => [search.value, assetType], (val) => {
  const [item, type] = val
  debouncedPush(`/${type.value}/${item}`)
})
</script>