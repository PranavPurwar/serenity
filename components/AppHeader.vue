<template>
  <header class="p-2 md:p-8 md:py-12">

    <div class="flex gap-4 pr-4 items-center text-center">
      <div class="hidden lg:flex gap-12 w-full text-gray-200 text-center items-center justify-center">
        <a v-for="header in HEADERS" :key="header.title" :href="header.link"
          class="text-xl font-semibold text-center no-underline hover:underline font-sans antialiased">
          {{ header.title }}</a>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">

import { HEADERS } from './data'

function navigateTo(link: string) {
  navigateTo(link)
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
