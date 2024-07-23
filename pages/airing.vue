<template>
  <div class="bg-gradient-to-b from-gray-800 to-[#040404]">
      <AppHeader />
      <div class="flex flex-col gap-8 pl-4 lg:pl-8 xl:pl-12">
          <h1 class="text-3xl font-bold text-[#ff8da3]">Top Airing</h1>

          <div class="flex gap-8">
              <div class="grid grid-cols-4 gap-6">
                  <Anime
                      v-for="anime in topAiring"
                      :key="anime.id"
                      :anime="anime"
                  />
              </div>

              <Sidebar />
          </div>
      </div>

      <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import Sidebar from "../components/Sidebar.vue";

import { topAiring } from "../server/provider";
</script>

<style></style>
