<template>
  <header class="p-2 md:p-8 md:py-12">

    <div class="flex gap-4 pr-4 items-center text-center">
      <div class="hidden md:flex gap-12 w-full text-gray-200 text-center items-center justify-center">
        <a v-for="header in HEADERS" :key="header.title" :href="header.link"
          class="text-xl text-center no-underline hover:underline font-sans font-medium">
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

</script>
