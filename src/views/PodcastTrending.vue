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
    <div class="search-bar">
      <input type="text" placeholder="搜索播客" />
    </div>
    <h1>精选推荐</h1>
    <div class="podcasts-grid section">
      <PodcastCard
        v-for="podcast in podcasts.slice(0, 3)"
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>
    <h2>热门节目</h2>
    <div class="hot-podcasts-grid section">
      <div class="hot-podcast" v-for="podcast in podcasts.slice(3, 7)" :key="podcast.id">
        <img :src="podcast.image" alt="podcast image" />
        <div class="hot-podcast-info">
          <h3>{{ podcast.title }}</h3>
          <!-- <p>{{ podcast.description }}</p> -->
        </div>
      </div>
    </div>
    <h2>正在直播</h2>
    <div class="live-podcasts-grid section">
      <div class="live-podcast" v-for="podcast in podcasts.slice(20, 22)" :key="podcast.id">
        <img :src="podcast.image" alt="podcast image" />
        <div class="live-podcast-info">
          <h3>{{ podcast.title }}</h3>
          <!-- <p>{{ podcast.description }}</p> -->
        </div>
      </div>
    </div>
    <h2>热门门类</h2>
    <div class="categories section">
      <div class="category" v-for="category in ['科技', '商业', '娱乐', '教育']" :key="category">
        <div class="category-icon">{{ category[0] }}</div>
        <div class="category-name">{{ category }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.search-bar input {
  width: 50%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

h1, h2 {
  margin-bottom: 1rem;
  color: #333;
}

.section {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.podcasts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.hot-podcasts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.live-podcasts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.hot-podcast, .live-podcast {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hot-podcast img, .live-podcast img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.hot-podcast-info, .live-podcast-info {
  display: flex;
  flex-direction: column;
}

.hot-podcast-info h3, .live-podcast-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.hot-podcast-info p, .live-podcast-info p {
  margin: 0.5rem 0 0;
  color: #666;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.category-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border-radius: 50%;
  font-size: 1.2rem;
  color: #333;
}

.category-name {
  font-size: 1rem;
  color: #333;
}
</style>