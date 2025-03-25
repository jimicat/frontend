<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Podcast } from '../types/podcast';

const router = useRouter();
const props = defineProps<{
  podcast: Podcast;
}>();

const showEpisodes = () => {
  router.push(`/podcasts/${props.podcast.id}/episodes/`);
};
</script>

<template>
  <div class="podcast-card" @click="showEpisodes">
    <img :src="podcast.image" :alt="podcast.title" class="podcast-image">
    <div class="podcast-info">
      <h2>{{ podcast.title }}</h2>
        <!-- <p>{{ podcast.categories }}</p> -->
        <!-- <p class="host">Hosted by {{ podcast.url }}</p> -->
        <!-- <p class="description">{{ podcast.description }}</p> -->
    </div>
  </div>
</template>

<style scoped>
.podcast-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.podcast-card:hover {
  transform: translateY(-4px);
}

.podcast-image {
  width: 100%;
  height:200px;
  object-fit: cover;
}

.podcast-info {
  padding: 1rem;
}

h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
}

.host {
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
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
}
</style>