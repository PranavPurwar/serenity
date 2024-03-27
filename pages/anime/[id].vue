<template>
    <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">
        <AppHeader />

        <div class="flex flex-col gap-16 px-16 py-8">
            <div class="flex gap-8 w-3/4">
                <img :src="info?.image" class="rounded-3xl w-[200px] h-fit" />
                <div class="flex flex-col gap-4 text-gray-50">
                    <h1 class="text-3xl font-bold">{{ info?.title }}</h1>
                    <div class="flex gap-4">
                    <p>{{ info?.type }}</p>
                    <p>{{ info?.genres }}</p>
                </div>
                    <p><span class="strong font-semibold">{{ info?.totalEpisodes }}</span> episodes</p>
                    <p class="antialiased">{{ info?.description }}</p>
                    </div>
                    <Sidebar title="Related" :animes="info?.relatedAnime" />

            </div>
            <p class="text-3xl font-bold text-[#ff8da3]">Recommendations</p>

<div class="grid grid-cols-4 gap-8 w-3/4">
    <Anime v-for="anime in info?.recommendations" :key="anime.id" :anime="anime" />
</div>


        </div>

        <AppFooter />
    </div>

</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { provider } from '../../server/provider';
import { IAnimeInfo } from '@pranavpurwar/consumet';
import { ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import Sidebar from '../../components/Sidebar.vue';
import Anime from '../../components/Anime.vue';

const route = useRoute();

const id = route.params.id as string;

const info = ref<IAnimeInfo | null>(null);

onMounted(async () => {
    info.value = await provider.fetchAnimeInfo(id);

    console.log((await provider.fetchAnimeInfo(id)));
})

</script>