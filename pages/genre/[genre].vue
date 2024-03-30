<template>
  <div class="flex flex-col min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">
    <AppHeader />

    <h1 class="text-3xl font-bold text-[#ff8da3] px-16">{{ genre }}</h1>

    <div class="flex px-8 py-8 gap-8">

      <div class="grid grid-flow-row grid-cols-4 rounded-3xl p-6 gap-6">
        <Anime v-for="anime in animes" :key="anime.id" :anime="anime" />
      </div>

      <Sidebar />
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>

import AppHeader from '../../components/AppHeader.vue';
import AppFooter from '../../components/AppFooter.vue';
import Sidebar from '../../components/Sidebar.vue';

import { getAnimeByGenre } from '../../server/provider'
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();

const genre = route.params.genre;

const animes = ref([]);

onMounted(async () => {
  animes.value = await getAnimeByGenre(genre);
})



</script>

<style></style>