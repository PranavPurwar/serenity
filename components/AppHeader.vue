<template>
  <header class="p-2 md:p-16 backdrop-blur-xl sticky top-0 w-[100vw] z-10">

      <div class="flex gap-4 pr-4 items-center text-center">
          <div class="hidden lg:flex gap-12 w-full text-gray-200 text-center items-center justify-center">
              <a v-for="header in HEADERS" :key="header.title" :href="header.link"
                  class="text-xl font-semibold text-center no-underline hover:underline font-sans antialiased">{{ header.title }}</a>
          </div>

          <Sheet>
              <SheetTrigger class="lg:hidden">
                  <img class="h-8 w-8 dark:invert" src="/svg/menu.svg" alt="Menu" />
              </SheetTrigger>

              <SheetContent class="bg-slate-800 p-4 flex flex-col rounded-s-3xl">

              <SheetHeader class="text-gray-200">
                  <SheetTitle class="text-2xl font-semibold text-gray-200">Menu</SheetTitle>
              </SheetHeader>

                  <div class="flex flex-col gap-4 py-8">
                      <a v-for="header in HEADERS" class="flex items-center gap-2 text-left rounded-3xl bg-slate-950 text-xl font-medium hover:underline p-4 text-gray-300 antialiased" :href="header.link">
                          <img class="h-8 w-8 p-1 invert" :src="header.icon" :alt="header.title"  />
                          {{ header.title }}
                      </a>
                  </div>
              </SheetContent>
          </Sheet>
      </div>

  </header>
</template>

<script setup lang="ts">

import { HEADERS } from './data'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

</script>

<style scoped>
/* Add any necessary styles here */
</style>