<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Podcast } from '../types/podcast';
import PodcastCard from '../components/PodcastCard.vue';

import api from '../api'; // Import the API module

const podcasts = ref<Podcast[]>([]);

const fetchPodcasts = async () => {
  try {
    const data = await api.getPodcasts(); // 调用 API 获取播客数据
    console.log(data); // 打印返回的 data 以查看格式

    // 假设 data 是一个数组，直接处理
    if (Array.isArray(data)) {
      // 按 trendScore 排序
      podcasts.value = data.sort((a, b) => b.trendScore - a.trendScore);
    } else {
      console.error('数据格式错误，返回的数据不是数组');
      podcasts.value = [];
    }
  } catch (error) {
    console.error('获取播客数据失败:', error);
    podcasts.value = [];
  }
};

onMounted(fetchPodcasts);
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="search-bar flex justify-center mb-8">
      <input type="text" placeholder="搜索播客" class="w-1/2 p-2 text-lg border border-gray-300 rounded-lg" />
    </div>
    <h1 class="text-3xl font-bold mb-4 text-gray-800">精选推荐</h1>
    <div class="podcasts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <PodcastCard
        v-for="podcast in podcasts.slice(0, 3)"
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">热门节目</h2>
    <div class="hot-podcasts-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div class="hot-podcast flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm" v-for="podcast in podcasts.slice(3, 7)" :key="podcast.id">
        <img :src="podcast.image" alt="podcast image" class="w-24 h-24 object-cover rounded-lg" />
        <div class="hot-podcast-info flex flex-col">
          <h3 class="text-xl font-semibold text-gray-800">{{ podcast.title }}</h3>
        </div>
      </div>
    </div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">正在直播</h2>
    <div class="live-podcasts-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <div class="live-podcast flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm" v-for="podcast in podcasts.slice(20, 22)" :key="podcast.id">
        <img :src="podcast.image" alt="podcast image" class="w-24 h-24 object-cover rounded-lg" />
        <div class="live-podcast-info flex flex-col">
          <h3 class="text-xl font-semibold text-gray-800">{{ podcast.title }}</h3>
          <!-- <p class="text-gray-600">{{ podcast.description }}</p> -->
        </div>
      </div>
    </div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">热门门类</h2>
    <div class="categories flex flex-wrap gap-4">
      <div class="category flex items-center gap-2 p-2 border border-gray-200 rounded-lg" v-for="category in ['科技', '商业', '娱乐', '教育']" :key="category">
        <div class="category-icon w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg text-gray-800">{{ category[0] }}</div>
        <div class="category-name text-lg text-gray-800">{{ category }}</div>
      </div>
    </div>
  </div>
</template>