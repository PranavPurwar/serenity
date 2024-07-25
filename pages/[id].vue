<template>
    <div class="bg-gradient-to-b from-gray-800 to-[#040404] wp[1/4]">
        <AppHeader />

        <div class="flex gap-6 pl-8 pr-8">
            <div class="flex flex-col gap-12 xl:gap-12">
                <div class="flex gap-8 text-lg">
                    <img
                        :src="info?.anime.info.poster"
                        class="rounded-3xl w-[220px] h-fit"
                        style="aspect-ratio: 3/4;"
                    />
                    <div class="flex flex-col gap-4 text-gray-50">
                        <h1 class="text-4xl font-bold font-sans">
                            {{
                                info?.anime.info.name ||
                                info?.anime.moreInfo.japanese
                            }}
                        </h1>
                        <div class="flex gap-2 items-center">
                            <p>{{ info?.anime.info.stats.type }}</p>
                            <p
                                v-for="genre in info?.anime.moreInfo.genres"
                                class="py-1 px-2 border border-gray-400 rounded-lg hover:bg-gray-600 text-sm"
                            >
                                {{ genre }}
                            </p>
                        </div>
                        <p>
                            <span class="strong font-semibold">{{
                                info?.anime.info.stats.episodes.sub
                            }}</span>
                            episodes
                        </p>
                        <p
                            id="description"
                            class="text-lg font-normal line-clamp-4"
                            @click="expandText"
                        >
                            {{ info?.anime.info.description }}
                        </p>

                        <div
                            class="flex gap-4 items-center text-center bg-[#e25470] hover:bg-[#b3324c] hover:cursor-pointer rounded-full p-4 pr-8 pl-8 font-semibold text-2xl w-fit"
                            @click="watch"
                        >
                            Watch
                            <img
                                class="h-6 w-6 rounded-full invert"
                                src="/svg/play.svg"
                            />
                    </div>
                    </div>
                </div>
                <div class="flex w-full truncate gap-2 overflow-x-auto">
                    <a class="rounded-lg w-full h-[10vh] bg-center bg-cover" v-for="season in info?.seasons" :href="'/' + season.id" :style="'background-image: url(' + season.poster + ')'">
                        <p class="flex justify-center items-center p-2 rounded-lg w-full h-full backdrop-blur-md text-white text-lg font-sans font-semibold">{{ season.title }}</p>
                    </a>
                </div>
                <p class="text-3xl font-bold text-[#ff8da3]">Related</p>

                <div class="grid grid-cols-4 gap-8">
                    <Anime
                        v-for="anime in info?.relatedAnimes"
                        :key="anime.id"
                        :anime="anime"
                    />
                </div>

                <p class="text-3xl font-bold text-[#ff8da3]">Recommended</p>

                <div class="grid grid-cols-4 gap-8">
                    <Anime
                        v-for="anime in info?.recommendedAnimes"
                        :key="anime.id"
                        :anime="anime"
                    />
                </div>
            </div>
            <Sidebar />
        </div>

        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Info } from "~/server/types";
import { getAnimeDetails } from "~/server/provider";

const router = useRoute();

const id = router.params.id;

const info = ref<Info | null>(null);

info.value = await getAnimeDetails(id);

async function watch() {
    await navigateTo('/watch/' + id)
}

function expandText() {
    const description = document.getElementById("description")!;
    if (description.classList.contains("line-clamp-4")) {
        description.classList.remove("line-clamp-4");
    } else {
        description.classList.add("line-clamp-4");
    }
}
</script>
