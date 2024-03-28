<template>

    <div class="flex flex-col md:gap-8 xl:gap-16 xl:p-4 rounded-2xl absolute end-4">

        <h1 class="text-3xl font-bold text-[#ff8da3] px-16">{{ title }}</h1>

        <HorizontalAnimeResult v-for="anime in animes.slice(0, 10)" :key="anime.id" :anime="anime" />



    </div>
</template>

<script setup lang="ts">

import { topAiring } from '~/server/provider';

interface Props {
    title: string,
    animes: []
}

withDefaults(defineProps<Props>(), {
    title: "Spotlight",
    animes: topAiring
})


</script>
