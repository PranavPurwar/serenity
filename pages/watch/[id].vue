<template>
    <body>
        <div class="bg-gradient-to-b from-gray-800 to-[#040404]">
            <AppHeader :isScrollable="true" />

            <div class="flex gap-4">
                <div class="flex flex-col gap-8 p-4 xl:pl-16 xl:pr-8">
                    <h1 class="text-3xl font-bold text-[#ffc8d3]">
                        {{ info?.anime.info.name || info?.anime.moreInfo.japanese }}
                    </h1>

                    <div id="container" class="relative">
                        <div id="content">
                            <p class="text-xl w-fit p-4 rounded-2xl bg-gray-50 opacity-70 font-bold text-[#ff8da3] hover:cursor-pointer z-[9999] hidden">
                                Skip opening
                            </p>
                        </div>
                        <iframe v-if="vidSrc" :src="vidSrc" class="w-full aspect-video rounded-2xl" frameborder="0" allowfullscreen></iframe>
                        <video v-else id="player" class="w-full aspect-video rounded-lg lg:rounded-2xl z-1" controls playsinline crossorigin="anonymous">
                            <track kind="subtitles" v-for="subtitle in tracks" :src="subtitle.file" :srclang="subtitle.label" :label="subtitle.label" :default="subtitle.default" />
                        </video>
                    </div>

                    <div v-if="!vidSrc && info?.anime.info.stats.episodes.sub" class="flex gap-8 items-center rounded-s-xl bg-gray-800">
                        <div class="flex flex-col gap-4 bg-[#ffb7c5] p-8 rounded-s-xl w-1/3">
                            <p class="text-gray-900 font-semibold tracking-wide text-xl">
                                You are watching <span class="font-bold">episode {{ episode?.number }}.</span>
                            </p>
                            <p class="text-gray-900 font-medium text-md antialiased">If the current server doesn't work, try switching to some other server.</p>
                        </div>
                        <div class="flex flex-col gap-4 text-white">
                        <div class="flex gap-2 text-center items-center">
                                <img
                                    src="/svg/cc.svg"
                                    class="h-6 w-6 invert"
                                    alt="Subtitles"
                                />
                                <p class="font-semibold me-4">SUB:</p>
                                <div class="flex gap-4">
                                    <p
                                        class="bg-[#ffb7c5] hover:bg-[#f38ca0] text-gray-900 p-2 rounded-lg hover:cursor-pointer font-semibold"
                                        v-for="server in servers?.sub"
                                        :id="server.serverName"
                                        @click="
                                            changeServer(
                                                server.serverName,
                                                'sub'
                                            )
                                        "
                                    >
                                        {{ server.serverName.toUpperCase() }}
                                    </p>
                                </div>
                            </div>
                            <div
                                v-if="info?.anime.info.stats.episodes.dub"
                                class="flex gap-2 text-center items-center"
                            >
                                <img
                                    src="/svg/dub.svg"
                                    class="h-6 w-6 invert"
                                    alt="Subtitles"
                                />
                                <p class="font-semibold me-4">DUB:</p>
                                <div class="flex gap-4">
                                    <p
                                        class="bg-[#ffb7c5] hover:bg-[#f38ca0] text-gray-900 p-2 rounded-lg hover:cursor-pointer font-semibold"
                                        v-for="server in servers?.dub"
                                        :id="server.serverName"
                                        @click="
                                            changeServer(
                                                server.serverName,
                                                'dub'
                                            )
                                        "
                                    >
                                        {{ server.serverName.toUpperCase() }}
                                    </p>
                                </div>
                            </div>
                            </div>
                    </div>

                    <div class="flex flex-col gap-2 rounded-2xl p-4 max-h-[40vh] w-full overflow-auto">
                        <div class="flex gap-4 bg-gray-800 rounded-xl p-4 hover:cursor-pointer" v-for="episode in episodes" :id="episode.episodeId" @click="playEpisode(episode.number, episode.episodeId)">
                            <p class="text-gray-200 font-semibold">{{ episode.number }}</p>
                            <p class="text-gray-200">{{ episode.title }}</p>
                        </div>
                    </div>

                    <div class="flex gap-8">
                        <div v-for="season in info?.seasons" class="w-[20vw] rounded-lg backdrop:blur-lg" :style='"aspect-ratio: 16 / 9; background-image: url(" + season.poster + "); background-size: cover;"'></div>
                    </div>

                    <p class="text-3xl font-bold text-[#ff8da3]">Recommendations</p>
                    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        <Anime v-for="anime in info?.recommendedAnimes" :key="anime.id" :anime="anime" />
                    </div>
                </div>
                <Sidebar title="Related" :animes="info?.relatedAnimes" />
            </div>
            <AppFooter />
        </div>
    </body>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAnimeDetails, getServers, getStream, getEpisodes, getTmdbFromInfo } from "../../server/provider";
import { ref, onMounted } from "vue";
import AppHeader from "../../components/AppHeader.vue";
import AppFooter from "../../components/AppFooter.vue";
import type { Episode, Servers, Stream } from "../../server/types";
import Hls from "hls.js";

const route = useRoute();
const id = route.params.id as string;
const category = route.query.category as string | undefined;

const info = await getAnimeDetails(id);
const tracks = ref<object | null>();
const servers = ref<Servers>();
const vidSrc = ref<string | null>(null);

const hls = new Hls();

let type: string
let episodes: Episode[]
let episode: Episode

onMounted(async () => {
    episodes = await getEpisodes(id);

    const tmdb = await getTmdbFromInfo(info);
    type = tmdb?.type === "Movie" ? "movie" : "tv";

    episode = episodes[0];
    if (tmdb) {
        vidSrc.value = `https://vidsrc.net/embed/${type}/${tmdb.id}?season=1&episode=${episode.number}`;
    } else {
        await streamZoro(episode.episodeId);
    }
});

async function streamZoro(episodeId: string) {
    servers.value = await getServers(episodeId!);
    let stream: Stream
    try {
        stream = await getStream(episodeId, category || "sub");
    } catch (e) {
        alert("This episode is not available on this server. Please try another server.");
        return
    }
    const source = stream.sources.at(0)?.url as string;
    const video = document.querySelector("video")!;
    if (Hls.isSupported()) {
        hls.attachMedia(video);
        hls.loadSource(source);
        tracks.value = stream.tracks;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source;
    } else {
        alert("Your browser does not support HLS");
    }
}

function playEpisode(episodeNo: number, episodeId: string) {
    const streamUrl = `https://vidsrc.net/embed/${type}/${tmdb?.id}?season=1&episode=${episodeNo}`;
    fetch(streamUrl).then((res) => {
        if (res.status !== 404) {
            vidSrc.value = streamUrl;
        } else {
            navigateTo(`/watch/${id}?episodeId=${episodeId}`);
        }
    });
}

function changeServer(serverName: string, category: string) {
    window.location.href = `/watch/${id}?episodeId=${episode.value.episodeId}&server=${serverName}&category=${category}`;
}
</script>

<style scoped></style>
