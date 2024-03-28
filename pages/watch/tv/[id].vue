<template>

  <body>
    <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">

      <AppHeader :isScrollable='true' />

      <div class="flex gap-4 h-fit">

        <div class="flex flex-col gap-16 px-16 w-[80vw]">
          <h1 class="text-3xl font-bold text-[#ff8da3]">{{ info?.title || info?.japaneseTitle }}</h1>

          <div id="container">
            <video id="player" class="w-[80vw] rounded-2xl" controls playsinline>
              <source v-for="source in isource?.sources" :src="source.url" type="application/x-mpegURL" />

              <!-- Caption files -->
              <track v-for="caption in isource?.subtitles" kind="captions" :label="caption.lang" :src="caption.url"
                default />
            </video>
          </div>

          <div class="flex flex-col gap-2 rounded-2xl p-4 h-[40vh] overflow-auto">
            <div class="flex gap-4 bg-gray-800 p-4 hover:cursor-pointer" v-for="episode in info?.episodes"
              :id="episode.id" @click="playEpisode(episode.id)">
              <p class="text-gray-200 font-semibold">{{ episode.number }}</p>
              <p class="text-gray-200">{{ episode.title }}</p>
            </div>
          </div>

          <p class="text-3xl font-bold text-[#ff8da3]">Recommendations</p>

          <div class="grid grid-cols-4 gap-8 w-[3/4]">
            <Anime v-for="anime in info?.recommendations" :key="anime.id" :anime="anime" />
          </div>
        </div>
        <Sidebar title="Related" :animes="info?.similar" />
      </div>
      <AppFooter />
    </div>
  </body>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { getTmdbDetails, watchEpisode } from '../../../server/provider';
import type { ISource, IAnimeInfo } from '@consumet/extensions';
import { ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import Hls from 'hls.js';

const route = useRoute();

const id = route.params.id as string;
const episodeId = route.query.id;

const info = ref<IAnimeInfo>();

onMounted(async () => {
  info.value = await getTmdbDetails(id);
});

</script>

<style scoped>

use {
  width: 10px;
  height: 10px;
}

.icon--pressed {
  width: 10px;
  height: 10px;
}

</style>
