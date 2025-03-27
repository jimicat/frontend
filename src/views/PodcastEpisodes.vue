<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Play, Pause } from 'lucide-vue-next';
import type { Episode } from '../types/episode';
import type { Podcast } from '../types/podcast';

import api from '../api';
import AudioPlay from '../components/AudioPlay.vue'; // 确保引入 AudioPlay 组件

const route = useRoute();
const podcastId = Number(route.params.id);
const episodes = ref<Episode[]>([]);
const podcast = ref<Podcast | null>(null);

const currentEpisodeId = ref<number | null>(null); // 当前播放的单集 ID
const isPlaying = ref<boolean>(false); // 播放状态

const currentEpisode = computed(() => {
  return episodes.value.find(episode => episode.id === currentEpisodeId.value) || null;
});

//限制描述长度
const truncateDescription = (text: string, length: number = 100) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// 移除 HTML 标签
const removeHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '').trim(); // 移除 HTML 标签并去除首尾空格
};

// 播放/暂停音频
const togglePlay = (episode: Episode) => {
  if (currentEpisodeId.value === episode.id) {
    isPlaying.value = !isPlaying.value;
  } else {
    currentEpisodeId.value = episode.id;
    isPlaying.value = true;
  }
};

watch(currentEpisodeId, (newId, oldId) => {
  if (newId !== oldId && isPlaying.value) {
    isPlaying.value = false;
  }
});

onMounted(async () => {
  try {
    const podcasts = await api.getPodcasts();
    podcast.value = podcasts.find(p => p.id === podcastId) || null;

    if (podcast.value) {
      episodes.value = await api.getEpisodes(podcastId);
    }
  } catch (error) {
    console.error("Error loading podcasts or episodes:", error);
  }
});
</script>

<template>
  <div class="container mx-auto p-4" v-if="podcast">
    <header class="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-8">
      <div class="flex items-center space-x-4">
        <img :src="podcast.image" :alt="podcast.title" class="w-24 h-24 object-cover rounded-full shadow-lg">
        <div>
          <h1 class="text-4xl font-bold">{{ podcast.title }}</h1>
          <p class="text-lg">{{ podcast.author }}</p>
        </div>
      </div>
      <div class="mt-4 text-center">
        <img src="" alt="Astronaut Illustration" class="mx-auto w-64 h-64">
      </div>
    </header>
    <main>
      <h2 class="text-3xl font-semibold mb-4">Episodes</h2>
      <ul class="divide-y divide-gray-200">
        <li
          v-for="episode in episodes"
          :key="episode.id"
          class="py-4 flex items-center relative group bg-white rounded-lg shadow-lg"
        >
          <img :src="episode.image" :alt="episode.title" class="w-24 h-24 object-cover rounded-lg mr-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-2">{{ episode.title }}</h3>
            <p class="text-gray-700 mb-2">{{ removeHtmlTags(truncateDescription(episode.description, 100)) }}</p>
            <div class="flex items-center justify-between text-gray-600">
              <span>{{ ((episode.duration)/60).toFixed(2) }} mins</span>
              <button @click="togglePlay(episode)" class="text-blue-500 hover:text-blue-700">
                <component :is="currentEpisodeId === episode.id && isPlaying ? Pause : Play" class="w-6 h-6" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>

  <div class="audio-player-container fixed bottom-0 right-0 mx-auto">
    <AudioPlay v-if="currentEpisode" :src="currentEpisode.enclosureUrl" />
  </div>
</template>