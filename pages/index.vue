<template>
  <div class="flex flex-col bg-gradient-to-b from-gray-800 to-[#040404] items-center">
    <AppHeader />
    <div class="rounded-3xl lg:rounded-tr-[60px] lg:rounded-bl-[60px] m-8 md:m-0 lg:w-[60vw]"
      style="aspect-ratio: 16 / 9; background-image: url('/png/bg.png'); background-size: cover;">
      <div
        class="flex flex-col gap-4 w-full h-full p-4 md:p-12 bg-gradient-to-r from-[#0000009e] to-transparent justify-between rounded-tr-[60px] rounded-bl-[60px]">
        <h1 class="text-4xl md:text-5xl font-bold text-white font-sans subpixel-antialiased">Serenity</h1>

        <div class="flex gap-4">
          <input class="rounded-3xl p-4 w-full lg:w-[30vw] border-0 outline-0" type="search" id="search" name="gsearch"
            placeholder="Search anime...">
          <img src="/svg/search.svg" alt="Search" class="h-14 w-14 p-3 bg-[#ffb7c5] hover:bg-[#f28ca0] rounded-2xl hover:cursor-pointer"
            @click="search" />
        </div>

        <div
          class="hidden md:flex gap-4 bg-[#ff5073] text-gray-50 rounded-3xl p-3 pr-8 pl-8 font-semibold text-xl lg:text-2xl items-center w-fit hover:cursor-pointer"
          @click="gotoPopular">
          Watch the latest anime episodes and movies for free
          <img class="h-12 w-12 rounded-full invert" src="/svg/next.svg" />
        </div>

      </div>
    </div>

    <div class="flex flex-col gap-8 p-16">
      <h1 class="text-3xl font-bold text-[#ff8da3]">Popular Anime</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        <Anime v-for="anime in popular" :key="anime.id" :anime="anime" />
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import Anime from '~/components/Anime.vue';

import { popular } from '../server/provider'

const router = useRouter();

function gotoPopular() {
  router.push('/popular');
}

function search() {
  const search = document.getElementById('search') as HTMLInputElement;

  if (search.value) {
    router.push(`/search?query=${search.value}`);
  }
}

</script>
