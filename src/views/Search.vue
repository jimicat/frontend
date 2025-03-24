<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockPodcasts } from '../data/mockPodcasts';
import { mockEpisodes } from '../data/mockEpisodes';
import type { Podcast } from '../types/podcast';
import type { Episode } from '../types/episode';
import PodcastCard from '../components/PodcastCard.vue';

const searchQuery = ref('');
const searchType = ref<'podcasts' | 'episodes'>('podcasts');

const filteredPodcasts = computed(() => {
  if (!searchQuery.value) return [];
  return mockPodcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    podcast.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredEpisodes = computed(() => {
  if (!searchQuery.value) return [];
  return mockEpisodes.filter(episode => 
    episode.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <div class="search-header">
      <h1>Search</h1>
      <div class="search-controls">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search podcasts or episodes..."
          class="search-input"
        >
        <div class="search-type-toggle">
          <button
            :class="{ active: searchType === 'podcasts' }"
            @click="searchType = 'podcasts'"
          >
            Podcasts
          </button>
          <button
            :class="{ active: searchType === 'episodes' }"
            @click="searchType = 'episodes'"
          >
            Episodes
          </button>
        </div>
      </div>
    </div>

    <div v-if="searchType === 'podcasts'" class="podcasts-grid">
      <PodcastCard
        v-for="podcast in filteredPodcasts"
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>

    <div v-else class="episodes-list">
      <div v-for="episode in filteredEpisodes" :key="episode.id" class="episode-card">
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

.search-header {
  margin-bottom: 2rem;
}

.search-controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-type-toggle {
  display: flex;
  gap: 0.5rem;
}

.search-type-toggle button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.search-type-toggle button.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
}

.podcasts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
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