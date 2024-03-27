<template>
    <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">
        <AppHeader />

        <div class="flex flex-col gap-16 px-16 py-8">
            <div class="flex gap-8 w-3/4">
                <img :src="info?.image" class="rounded-3xl w-[200px] h-fit" />
                <div class="flex flex-col gap-4 text-gray-50">
                    <h1 class="text-3xl font-bold">{{ info?.title || info?.japaneseTitle }}</h1>
                    <div class="flex gap-4">
                        <p>{{ info?.type }}</p>
                        <p>{{ info?.genres }}</p>
                    </div>
                    <p><span class="strong font-semibold">{{ info?.totalEpisodes }}</span> episodes</p>
                    <p class="antialiased">{{ info?.description }}</p>

                    <a class="flex gap-4 items-center text-center bg-[#ff5073] rounded-full p-4 pr-8 pl-8 font-semibold text-2xl w-fit" :href="'/watch/' + info?.id">
                        Watch
                        <img class="h-6 w-6 rounded-full invert" src="/svg/play.svg" />
                    </a>
                </div>
                <Sidebar title="Related" :animes="info?.relatedAnime" />

            </div>
            <p class="text-3xl font-bold text-[#ff8da3]">Recommendations</p>

            <div class="grid grid-cols-4 gap-8 w-[3/4]">
                <Anime v-for="anime in info?.recommendations" :key="anime.id" :anime="anime" />
            </div>

        </div>

        <AppFooter />
    </div>

</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import type { IAnimeInfo } from '@consumet/extensions';
import { ref } from 'vue';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import Sidebar from '../components/Sidebar.vue';
import Anime from '../components/Anime.vue';
import { getAnimeDetails } from '~/server/provider'

const route = useRoute();

const id = route.params.id as string;

const info = ref<IAnimeInfo | null>(null);

onMounted(async () => {
    await getAnimeDetails(id).then((data) => {
        info.value = data;

        console.log(data);
    })
})

</script>