<template>

    <div class="flex flex-col gap-4 bg-[#04040451] hover:bg-[#444040ae] rounded-3xl p-6 w-[1/6] h-fit hover:cursor-pointer" @click="onClick">
        <div class="relative rounded-2xl w-full gap-2"
            :style='"background-image: url(" + anime.poster + "); background-size: cover; aspect-ratio: 3/4;"'>

            <p v-if="anime.nsfw"
                class="absolute top-2 left-4 bg-[#e91842] p-1 rounded-lg font-semibold text-xs">18+</p>
            <div v-if="anime.episodes && anime.episodes.sub != null" class="flex gap-2 absolute bottom-2 right-4 text-white font-semibold">
                <div class="flex gap-1 p-1 bg-[#d1536c] h-6 rounded-md items-center" v-if="anime.episodes.sub">
                    <img class="h-5 w-5 rounded-full invert" src="/svg/cc.svg" />
                    <p>{{ anime.episodes.sub }}</p>
                </div>

                <div class="flex gap-1 p-1 bg-[#558ceb] h-6 rounded-md items-center" v-if="anime.episodes.dub">
                    <img class="h-5 w-5 rounded-full invert" src="/svg/dub.svg" />
                    <p>{{ anime.episodes.dub }}</p>
                </div>
            </div>
        </div>
        <h1 class="text-lg font-bold text-gray-50 antialiased line-clamp-1">{{ anime.name }}</h1>
        <div class="flex justify-between text-gray-300">
            <p>{{ anime.type }}</p>
            <p>{{ anime.duration || anime.releaseDate }}</p>
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

async function onClick() {
    await navigateTo(`/${props.anime.id}`);
}

</script>