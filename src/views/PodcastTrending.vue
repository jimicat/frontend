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
  <div class="container">
    <h1>Trending Podcasts</h1>
    <div class="podcasts-grid">
      <PodcastCard
        v-for="podcast in podcasts"
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.podcasts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
</style>