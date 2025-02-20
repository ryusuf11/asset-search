<template>
  <div :class="styles.header">
    <div :class="styles.headerSection">
      <h1 :class="styles.headerSection__title">
        {{ title }}
      </h1>
      <p :class="styles.headerSection__subtitle">
        {{ subtitle }}
      </p>
    </div>
    <div class="position-absolute w-100" style="height:58px;"></div>
    <div ref="headerSection" :class="styles.headerNav" class="headerNav">
      <div :class="styles.headerNav__filter">
        <div class="d-flex gap-2 align-items-center flex-grow-1">
          <Icon name="icon:filter" />
          <span>
            Filter
          </span>
        </div>
        <div class="cursor-pointer">
          <Icon name="lucide:x" size="24" />
        </div>
      </div>
      <div :class="styles.headerNav__links">
        <NuxtLink v-for="menu in menus" :key="menu.title" :to="menu.link"
          :class="menu.isActive ? styles['headerNav__links-active'] : null">
          {{ menu.title }}
        </NuxtLink>
      </div>
    </div>
    <div ref="sentinel" class="sentinel" />
  </div>
</template>

<script setup lang="ts">
import { assetLink } from "~/modules/constants/assetLink";
import styles from "./Header.module.scss";

defineProps<{
  title?: string;
  subtitle?: string;
}>();

const route = useRoute();

const menus = computed(() => {
  return assetLink.map(menu => ({
    title: menu.title,
    link: `${menu.link}/${route.params.search}`,
    isActive: route.path.includes(menu.link),
  }))
});

const headerSection = useTemplateRef<HTMLElement | null>('headerSection')
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
  if (headerSection.value) {
    headerSection.value.classList.toggle('headerNav--sticky', value)
  }
})
</script>
