<template>
    <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">
        <AppHeader />

        <div class="flex flex-col gap-16 px-16 py-8">
            <div class="flex gap-8 w-3/4">
                <img :src="info?.anime.info.poster" class="rounded-3xl w-[200px] h-fit" />
                <div class="flex flex-col gap-4 text-gray-50">
                    <h1 class="text-3xl font-bold">{{ info?.anime.info.name || info?.anime.moreInfo.japanese }}</h1>
                    <div class="flex gap-4 items-center">
                        <p>{{ info?.anime.info.stats.type }}</p>
                        <p v-for="genre in info?.anime.moreInfo.genres" class="py-1 px-2 border border-gray-400 rounded-full">{{ genre }}</p>
                    </div>
                    <p><span class="strong font-semibold">{{ info?.anime.info.stats.episodes.sub }}</span> episodes</p>
                    <p class="antialiased">{{ info?.anime.info.description }}</p>

                    <a class="flex gap-4 items-center text-center bg-[#ff5073] rounded-full p-4 pr-8 pl-8 font-semibold text-2xl w-fit" :href="'/watch/' + id">
                        Watch
                        <img class="h-6 w-6 rounded-full invert" src="/svg/play.svg" />
                    </a>
                </div>
                <Sidebar title="Related" :animes="info?.relatedAnimes" />

            </div>
            <p class="text-3xl font-bold text-[#ff8da3]">Recommendations</p>

            <div class="grid grid-cols-4 gap-8 w-[70vw]">
                <Anime v-for="anime in info?.recommendedAnimes" :key="anime.id" :anime="anime" />
            </div>

        </div>

        <AppFooter />
    </div>

</template>

<script setup lang="ts">

import { ref } from 'vue'
import type { Info } from '~/server/types'
import { getAnimeDetails } from '~/server/provider';

const router = useRoute()

const id = ref(router.params.id)

const info = ref<Info | null>(null)

onMounted(async () => {
    info.value = await getAnimeDetails(id.value)
})


</script>
