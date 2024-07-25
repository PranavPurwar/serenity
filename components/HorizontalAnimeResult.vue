<template>
  <div class="flex gap-2 text-white w-[20vw] items-center hover:cursor-pointer" @click="onClick">
    <LazyNuxtImg class="w-[6rem] rounded-lg" :src="anime.poster" alt="Anime Image" />
    <div class="flex flex-col gap-2 ms-2">
      <p class="line-clamp-2 text-lg font-semibold hover:underline">{{ anime.name }}</p>

      <div v-if="anime.episodes" class="flex gap-1 text-center text-gray-50">

        <div v-if="anime.episodes.dub" class="flex bg-[#d1536c] rounded-s-md gap-1 ps-1 pe-1 h-6 items-center">
          <img class="h-5 invert" src="/svg/cc.svg" alt="Sub" />
          <p class="text-sm font-semibold">{{ anime.episodes.sub }}</p>
        </div>

        <div v-else class="flex bg-[#558ceb] rounded-md gap-1 ps-1 pe-1 h-6 items-center">
          <img class="h-5 invert" src="/svg/cc.svg" alt="Sub" />
          <p class="text-sm font-semibold">{{ anime.episodes.sub }}</p>
          </div>

        <div v-if="anime.episodes.dub" class="flex bg-[#558ceb] rounded-e-md gap-1 ps-1 pe-2 h-6 items-center">
          <img class="h-5 invert" src="/svg/dub.svg" alt="Sub" />
          <p class="text-sm font-semibold">{{ anime.episodes.dub }}</p>
        </div>
      </div>
      <div v-else class="flex flex-col gap-4 ms-2">
          <p class="text-gray-50">{{ anime.otherInfo.at(0) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { IAnimeResult } from '@consumet/extensions';

interface Props {
  anime: IAnimeResult
}

const props = defineProps<Props>()

const router = useRouter()

function onClick() {
  router.push(`/${props.anime.id}`);
}

</script>

<style></style>