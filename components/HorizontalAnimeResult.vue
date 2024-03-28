<template>
  <div class="flex gap-2 text-white w-[18vw] items-center hover:cursor-pointer" @click="onClick">
    <img class="w-20 rounded-lg" :src="anime.poster" alt="Anime Image" />
    <div class="flex flex-col gap-2 ms-2">
      <p class="line-clamp-2 text-lg font-semibold">{{ anime.name }}</p>

      <div v-if="anime.episodes" class="flex gap-1 text-center text-gray-50">
        <div class="flex bg-[#ff5073] rounded-s-md gap-1 ps-1 pe-1 h-6 items-center">
          <img class="h-5 invert" src="/svg/cc.svg" alt="Sub" />
          <p class="text-sm font-semibold">{{ anime.episodes.sub }}</p>
        </div>
        <div class="flex bg-[#488bff] rounded-e-md gap-1 ps-1 pe-2 h-6 items-center">
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