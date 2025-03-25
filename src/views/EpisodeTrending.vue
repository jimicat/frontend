<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Episode } from '../types/episode';
import api from '../api';

const episodes = ref<Episode[]>([]);

const fetchEpisodes = async () => {
  try {
    const data = await api.getEpisodeTrending();
    if (Array.isArray(data)) {
      episodes.value = data.filter(episode => {
        const language = episode.feedLanguage.toLowerCase();
        return language.includes('zh') || language.includes('zh-CN');
    }).sort((a, b) => b.listens - a.listens);
    } else {
      console.error('数据格式错误，返回的数据不是数组');
      episodes.value = [];
    }
  } catch (error) {
    console.error('获取热门单集数据失败:', error);
    episodes.value = [];
  }
};
onMounted(fetchEpisodes);
</script>

<template>
  <div class="container">
    <h1>我的订阅</h1>
    <div class="subscriptions">
      <div v-for="episode in episodes" :key="episode.id" class="subscription-card">
        <img :src="episode.feedImage" :alt="episode.title" class="subscription-image">
        <div class="subscription-info">
          <h3>{{ episode.title }}</h3>
          <p class="podcast-name">{{ episode.podcastName }}</p>
          <button class="play-button">▶</button>
        </div>
      </div>
    </div>
    <h2>最近更新</h2>
    <div class="recent-updates">
      <div class="update-header">今日更新</div>
      <ul>
        <li v-for="episode in episodes" :key="episode.id">
          <span>{{ episode.title }}</span>
          <span>{{ episode.podcastName }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}

h1, h2 {
  margin-bottom: 1rem;
  color: #333;
}

.subscriptions, .recent-updates {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.subscriptions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.subscription-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.subscription-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.subscription-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.play-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.recent-updates ul {
  list-style: none;
  padding: 0;
}

.recent-updates li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.update-header {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>