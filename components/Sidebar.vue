<template>

    <div class="flex flex-col h-fit md:gap-8 xl:gap-16 xl:p-4 rounded-2xl absolute end-2">

        <h1 class="text-3xl font-bold text-[#ff8da3] px-16">{{ title }}</h1>

        <HorizontalAnimeResult v-for="anime in animes.slice(0, 10)" :key="anime.id" :anime="anime" />
<div class="flex flex-col gap-4 rounded-2xl">
    <h1 class="text-3xl font-bold text-[#ff8da3] px-16">Genres</h1>

        <div class="grid grid-cols-2 w-full gap-4 bg-gray-800 p-4 rounded-2xl">

            <p v-for="genre in genres" class="text-gray-200 antialiased p-4 bg-gray-900 rounded-xl text-xl font-sans font-semibold hover:cursor-pointer" @click="viewGenre(genre)">{{ genre }}</p>
        </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { topAiring, genres } from '~/server/provider';

interface Props {
    title: string,
    animes: []
}

withDefaults(defineProps<Props>(), {
    title: "Spotlight",
    animes: topAiring
})

const router = useRouter()

function viewGenre(genre: string) {
    router.push(`/genre/${ genre }`)
}


</script>
