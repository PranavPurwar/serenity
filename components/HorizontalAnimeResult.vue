<template>
  <div class="flex gap-2 text-white w-[18vw] items-center hover:cursor-pointer" @click="onClick">
    <img class="w-20 rounded-lg" :src="anime.image" alt="Anime Image" />
    <div class="flex flex-col gap-2">
      <p class="line-clamp-2 text-lg font-semibold">{{ anime.title }}</p>

      <div class="flex gap-1 text-center text-gray-50">
        <div class="flex bg-[#ff5073] rounded-s-md gap-1 ps-1 pe-1 h-6 items-center">
        <img class="h-5 invert" src="/svg/cc.svg" alt="Sub" />
        <p class="text-sm font-semibold">{{ anime.sub }}</p>
      </div>
      <div class="flex bg-[#488bff] rounded-e-md gap-1 ps-1 pe-2 h-6 items-center">
        <img class="h-5 invert" src="/svg/dub.svg" alt="Sub" />
        <p class="text-sm font-semibold">{{ anime.dub }}</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { IAnimeResult } from '@pranavpurwar/consumet'

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