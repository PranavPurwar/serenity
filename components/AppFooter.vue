<template>

    <div class="px-[8%]">
        <Separator />
    </div>
    
        <footer class="flex flex-col gap-6 text-gray-600 bottom-0 w-full p-8">
            <div class="flex md:justify-between gap-2 md:gap-8">
    
                <div class="hidden lg:flex flex-col gap-2">
                    <img class="h-20 w-20 rounded-lg"
                        src="/png/logo.png"
                        alt="Logo" />
                    <h1 class="font-bold text-xl text-gray-300">Serenity</h1>
                    <p class="font-sm leading-7 text-gray-400 antialiased">© 2024-2025 Serenity</p>
                </div>
    
                <div class="flex flex-col md:flex-row gap-8 md:gap-32 mr-8">
                        <a v-for="item in HEADERS" :href="item.link"
                        class="text-md md:text-lg font-medium leading-7 text-blue-400 hover:text-gray-800 hover:underline dark:hover:text-blue-500 subpixel-antialiased">
                        {{ item.title }}</a>
                    
                    </div>
            </div>
    
            <div class="text-center">
                <p class="text-md md:text-lg text-gray-500 dark:text-gray-400 antialiased">© 2024-2025 Serenity</p>
            </div>
        </footer>
    </template>
      
    <script setup lang="ts">
    
    import { SWPRO, COMMUNITY, MORE, HEADERS } from './data'
    import { Separator } from '@/components/ui/separator'
    
    
    </script>
