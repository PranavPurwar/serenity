<template>
  <header class="p-2 md:p-16 backdrop-blur-xl top-0 w-[100vw] z-10">

    <div class="flex gap-4 pr-4 items-center text-center">
      <div class="hidden lg:flex gap-12 w-full text-gray-200 text-center items-center justify-center">
        <div v-for="header in HEADERS" :key="header.title" @click="navigateTo(header.link)"
          class="text-xl font-semibold text-center no-underline hover:underline font-sans antialiased hover:cursor-pointer">
          {{ header.title }}</div>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">

import { HEADERS } from './data'

function navigateTo(link: string) {
  useRouter().push(link)
}


const props = defineProps({
  isScrollable: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
const header = document.querySelector('header') as HTMLElement

if (!props.isScrollable) {
  header.classList.add('sticky')
}
});

</script>

<style scoped>
/* Add any necessary styles here */
.sticky {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>