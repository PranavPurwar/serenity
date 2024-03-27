<template>
  <div class="w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-800 to-[#040404]">
    <AppHeader />

    <h1 class="text-3xl font-bold text-[#ff8da3] px-16">Recent Anime</h1>

    <div class="flex px-8 py-8 gap-8">

      <div class="grid grid-flow-row grid-cols-4 rounded-3xl p-6 gap-6 min-h-[100vh]">
        <Anime v-for="anime in recentlyAdded" :key="anime.id" :anime="anime" />
      </div>

<Sidebar />
      </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>

import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import Sidebar from '../components/Sidebar.vue';

import { recentlyAdded } from '../server/provider'

</script>

<style>

</style>