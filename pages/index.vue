<template>
  <div class="flex flex-col bg-[#040404] w-[100vw] items-center">
    <AppHeader />
    <div class="flex rounded-[60px] w-[70vw]" alt="anime"
      style="aspect-ratio: 16 / 9; background-image: url('/png/bg.png'); background-size: cover;">
      <div
        class="flex flex-col gap-4 w-full h-full p-12 bg-gradient-to-r from-[#0404049e] to-transparent justify-between">
        <h1 class="text-4xl md:text-5xl font-bold text-white font-sans subpixel-antialiased">Serenity</h1>

        <div class="flex gap-4">
          <input class="rounded-3xl p-4 w-[30vw] border-0 outline-0" type="search" id="gsearch" name="gsearch"
            placeholder="Search anime...">
          <img src="/svg/search.svg" alt="Search" class="h-14 w-14 p-3 bg-[#ffb7c5] rounded-2xl" />
        </div>

        <div class="flex gap-4 bg-[#ffb7c5] rounded-3xl p-4 pr-8 pl-8 font-semibold text-2xl items-center w-fit">
          Watch the latest anime episodes and movies for free
          <img class="h-12 w-12 rounded-full" src="/svg/next.svg" />
        </div>

      </div>
    </div>

    <div class="flex flex-col gap-8 p-16">
      <h1 class="text-3xl font-bold text-[#ff8da3]">Popular Anime</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="anime in popularAnime" :key="anime.id"
          class="flex flex-col gap-4 bg-[#0404049e] rounded-3xl p-4 w-[340px]">
          <div class="relative rounded-3xl w-full gap-2 text-center" :style='"background-image: url(" + anime.image + "); background-size: cover; aspect-ratio: 3/4;"'>

            <div class="flex gap-2 absolute bottom-2 right-4 text-white font-semibold">
            <div class="flex gap-2 p-2 bg-[#bb2a47] h-6 rounded-lg items-center">
              <img class="h-5 w-5 rounded-full invert" src="/svg/cc.svg" />
              <p>{{ anime.sub }}</p>
            </div>

            <div class="flex gap-2 p-2 bg-[#164596] h-6 rounded-md items-center">
              <img class="h-5 w-5 rounded-full invert" src="/svg/dub.svg" />
              <p>{{ anime.dub }}</p>
            </div>
            </div>
          </div>
          <h1 class="text-xl font-bold text-white">{{ anime.title }}</h1>
          <div class="flex justify-between">
          <p class="text-gray-300">{{ anime.type }}</p>
          <p class="text-gray-300">{{ anime.sub }} episodes</p>
        </div>
        </div>
      </div>
      </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

import { ANIME } from '@consumet/extensions';
import { IAnimeResult } from '@consumet/extensions';

const zoro = new ANIME.Zoro();

const popularAnime = ref(
  [] as IAnimeResult[]
)

onMounted(async () => {
  zoro.fetchMostPopular().then((data) => {
    popularAnime.value = data.results
    console.log(data.results.at(0))
  })
})

</script>
