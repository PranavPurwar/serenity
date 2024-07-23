<template>
    <div
        class="hidden xl:flex flex-col md:gap-8 pr-4 w-fit"
    >
        <h1 class="text-3xl font-bold text-[#ff8da3] text-center">{{ title }}</h1>

        <HorizontalAnimeResult
            v-for="anime in animes.slice(0, 10)"
            :key="anime.id"
            :anime="anime"
        />
        <div class="flex flex-col gap-4 rounded-2xl">
            <h1 class="text-3xl font-bold text-[#ff8da3] text-center">Genres</h1>

            <div
                class="grid grid-cols-2 gap-4 rounded-2xl h-[60vh] truncate"
            >
                <p
                    v-for="genre in genres"
                    class="text-gray-200 antialiased p-4 hover:bg-gray-800 rounded-xl text-xl font-sans font-semibold hover:cursor-pointer"
                    @click="viewGenre(genre)"
                >
                    {{ genre }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { topAiring, genres } from "~/server/provider";

interface Props {
    title: string;
    animes: [];
}

withDefaults(defineProps<Props>(), {
    title: "Spotlight",
    animes: topAiring,
});

const router = useRouter();

function viewGenre(genre: string) {
    router.push(`/genre/${genre}`);
}
</script>
