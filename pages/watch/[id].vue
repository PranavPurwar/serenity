<template>

  <body>
    <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">

      <AppHeader />

      <div class="flex gap-4 h-fit">

        <div class="flex flex-col gap-16 p-16 w-[80vw]">
          <h1 class="text-3xl font-bold text-[#ff8da3]">{{ info?.title || info?.japaneseTitle }}</h1>

          <div id="container">
            <video id="player" class="w-[80vw] h-fit rounded-2xl" controls playsinline :poster="info?.image">
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
        <Sidebar title="Related" :animes="info?.relatedAnime" />
      </div>
      <AppFooter />
    </div>
  </body>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { getAnimeDetails, watchEpisode } from '../../server/provider';
import type { ISource, IAnimeInfo } from '@consumet/extensions';
import { ref } from 'vue';
import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import Hls from 'hls.js';

const route = useRoute();

const id = route.params.id as string;
const episodeId = route.query.id;

const info = ref<IAnimeInfo>();

const isource = ref<ISource>();
const hls = new Hls();


onMounted(async () => {
  info.value = await getAnimeDetails(id);

  if (episodeId) {
    isource.value = await watchEpisode(episodeId as string);
  } else {
    isource.value = await watchEpisode(info.value!.episodes!.at(0)?.id);
  }

  console.log('isource' + isource.value?.sources.at(0)?.url);

  if (Hls.isSupported()) {
    hls.loadSource(isource.value?.sources.at(0)?.url);

    hls.attachMedia(document.getElementById('player'));
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log('manifest loaded, found ' + data.levels.length + ' quality level');
    });
  } else if (document.getElementById('player').canPlayType('application/vnd.apple.mpegurl')) {
    document.getElementById('player').src = isource.value?.sources.at(0)?.url;
  } else {
    alert("Your device doesn't support streaming.")
  }

})

function playEpisode(episodeId: string) {
  watchEpisode(episodeId).then((data) => {
    useRouter().push('/watch/' + id + '?id=' + episodeId);
    useRouter().go(0);
    /*
    if (Hls.isSupported()) {
    hls.loadSource(isource.value?.sources.at(0)?.url);
    hls.attachMedia(document.getElementById('player'));
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log('manifest loaded, found ' + data.levels.length + ' quality level');
    });
  } else if (document.getElementById('player').canPlayType('application/vnd.apple.mpegurl')) {
    document.getElementById('player').src = isource.value?.sources.at(0)?.url;
  } else {
    alert("Your device doesn't support streaming.")
  }

  document.querySelector('video')!.play();
  */
  })
};


</script>