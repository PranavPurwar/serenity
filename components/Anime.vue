<template>

    <div class="flex flex-col gap-4 bg-[#04040451] rounded-3xl p-6 w-[280px] h-[50vh] hover:cursor-pointer" @click="onClick">
        <div class="relative rounded-2xl w-full gap-2 text-center"
            :style='"background-image: url(" + anime.image + "); background-size: cover; aspect-ratio: 3/4;"'>

            <p v-if="anime.nsfw"
                class="absolute top-2 left-4 bg-[#e91842] p-2 rounded-lg text-white font-semibold text-xs">18+</p>
            <div class="flex gap-2 absolute bottom-2 right-4 text-white font-semibold">
                <div class="flex gap-2 p-2 bg-[#e91842] h-6 rounded-lg items-center">
                    <img class="h-5 w-5 rounded-full invert" src="/svg/cc.svg" />
                    <p>{{ anime.sub }}</p>
                </div>

                <div class="flex gap-2 p-2 bg-[#2575ff] h-6 rounded-md items-center">
                    <img class="h-5 w-5 rounded-full invert" src="/svg/dub.svg" />
                    <p>{{ anime.dub }}</p>
                </div>
            </div>
        </div>
        <h1 class="text-lg font-bold text-gray-50 antialiased line-clamp-2">{{ anime.title }}</h1>
        <div class="flex justify-between">
            <p class="text-gray-300">{{ anime.type }}</p>
            <p class="text-gray-300">{{ anime.duration }}</p>
        </div>
    </div>

</template>


<script setup lang="ts">

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