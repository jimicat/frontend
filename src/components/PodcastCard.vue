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
    </div>
  </div>
</template>

