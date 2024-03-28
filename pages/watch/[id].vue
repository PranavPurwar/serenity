<template>

  <body>
    <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">

      <AppHeader :isScrollable='true' />

      <div class="flex gap-4 h-fit">

        <div class="flex flex-col gap-16 px-16 w-[80vw]">
          <h1 class="text-3xl font-bold text-[#ff8da3]">{{ info?.anime.info.name || info?.anime.moreInfo.japanese }}
          </h1>

          <div id="container">
            <video id="player" class="w-full h-fit rounded-2xl" controls playsinline crossorigin="anonymous">
              <source :src="source" type="application/x-mpegURL">

              <track kind="subtitles" v-for="subtitle in tracks" :key="subtitle.lang" :src="subtitle.file"
                :srclang="subtitle.label" :label="subtitle.label" :default="subtitle.default">
            </video>
          </div>

          <div class="flex flex-col gap-2 rounded-2xl p-4 h-[40vh] overflow-auto">
            <div class="flex gap-4 bg-gray-800 p-4 hover:cursor-pointer" v-for="episode in episodes"
              :id="episode.episodeId" @click="playEpisode(episode.episodeId)">
              <p class="text-gray-200 font-semibold">{{ episode.number }}</p>
              <p class="text-gray-200">{{ episode.title }}</p>
            </div>
          </div>

          <p class="text-3xl font-bold text-[#ff8da3]">Recommendations</p>

          <div class="grid grid-cols-4 gap-8 w-[3/4]">
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

import { useRoute } from 'vue-router';
import { getAnimeDetails, getEpisodes, watchEpisode } from '../../server/provider';
import { ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import type { Info, Episode } from '../../server/types';
import Hls from 'hls.js';

const route = useRoute();

const id = ref(route.params.id)
const episodeId = route.query.episodeId as string | undefined;

const info = ref<Info | null>(null);
const episode = ref<Episode>();
const source = ref<string>()
const episodes = ref<Episode[]>();
const stream = ref<object | null>();
const tracks = ref<object | null>();

const hls = new Hls();


onMounted(async () => {
  info.value = await getAnimeDetails(id.value)

  episodes.value = await getEpisodes(id.value);

  if (episodeId.value) {
    episode.value = episodes.value.find((e) => e.episodeId === episodeId.value);
  } else {
  episode.value = episodes.value[0];
  }

  stream.value = await watchEpisode(episode.value.episodeId);

  source.value = stream.value.sources.at(0).url;

  const video = document.querySelector("video");

  console.log('isource' + source.value);

  if (Hls.isSupported()) {
    hls.attachMedia(video);

    hls.loadSource(source.value);

    window.hls = hls;

    hls.config.enableWebVTT = true

    tracks.value = stream.value!.tracks;

  } else if (document.getElementById('player').canPlayType('application/vnd.apple.mpegurl')) {
    document.getElementById('player').src = source.value;
  } else {
    alert('Your browser does not support HLS');
  }
  
});

function playEpisode(episodeId: string) {
  watchEpisode(episodeId).then((data) => {
    useRouter().push('/watch/' + id.value + '?episodeId=' + episodeId);
    useRouter().go(0);
  });
};


</script>

<style scoped>

::cue {
  background-color: rgba(0, 0, 0, 0.5); /* Black background with 50% opacity */
  padding: 5px; /* Add some padding around the text */
  border-radius: 3px; /* Add rounded corners for a smoother look */
  color:#ffc800;
  width: fit-content;
}

</style>
