<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mockEpisodes } from '../data/mockEpisodes';
import type { Episode } from '../types/episode';

const episodes = ref<Episode[]>([]);

onMounted(() => {
  episodes.value = mockEpisodes.sort((a, b) => b.listens - a.listens);
});
</script>

<template>
  <div class="container">
    <h1>Trending Episodes</h1>
    <div class="episodes-list">
      <div v-for="episode in episodes" :key="episode.id" class="episode-card">
        <img :src="episode.coverImage" :alt="episode.title" class="episode-image">
        <div class="episode-info">
          <h3>{{ episode.title }}</h3>
          <p class="podcast-name">{{ episode.podcastName }}</p>
          <p class="description">{{ episode.description }}</p>
          <div class="stats">
            <span>{{ episode.duration }} mins</span>
            <span>{{ episode.listens.toLocaleString() }} listens</span>
          </div>
        </div>
      </div>
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

.episodes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.episode-card {
  display: flex;
  gap: 1.5rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.episode-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.episode-info {
  flex: 1;
}

h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.podcast-name {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.description {
  color: #444;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.stats {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}
</style>