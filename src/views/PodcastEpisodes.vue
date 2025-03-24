<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Episode } from '../types/episode';
import type { Podcast } from '../types/podcast';

import api from '../api';

const route = useRoute();
const podcastId = Number(route.params.id);
const episodes = ref<Episode[]>([]);
const podcast = ref<Podcast | null>(null);

const audioRef = ref<HTMLAudioElement | null>(null); // 音频播放器
const currentEpisodeId = ref<number | null>(null); // 当前播放的单集 ID
const currentTime = ref<number>(0); // 当前播放时间
const duration = ref<number>(0); // 音频总时长
const isPlaying = ref<boolean>(false); // 播放状态

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
  if (!audioRef.value) {
    audioRef.value = new Audio();
  }

  if (currentEpisodeId.value === episode.id) {
    // 如果点击的是当前播放的单集，切换播放状态
    if (audioRef.value.paused) {
      audioRef.value.play();
      isPlaying.value = true;
    } else {
      audioRef.value.pause();
      isPlaying.value = false;
    }
  } else {
    // 播放新音频
    audioRef.value.src = episode.enclosureUrl;
    audioRef.value.play();
    currentEpisodeId.value = episode.id;
    isPlaying.value = true;

    // 监听音频时长更新
    audioRef.value.onloadedmetadata = () => {
      duration.value = audioRef.value!.duration;
    };

    // 监听播放时间更新
    audioRef.value.ontimeupdate = () => {
      currentTime.value = audioRef.value!.currentTime;
    };

    // 监听播放结束
    audioRef.value.onended = () => {
      isPlaying.value = false;
      currentEpisodeId.value = null;
      currentTime.value = 0;
    };
  }
};

// 进度条拖动改变播放时间
const updateProgress = (event: Event) => {
  if (audioRef.value) {
    const newTime = (event.target as HTMLInputElement).value;
    audioRef.value.currentTime = Number(newTime);
    currentTime.value = Number(newTime);
  }
};

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
  <div class="container" v-if="podcast">
    <div class="podcast-header">
      <img :src="podcast.image" :alt="podcast.title" class="podcast-cover">
      <div class="podcast-info">
        <h1>{{ podcast.title }}</h1>
        <p class="description">{{ removeHtmlTags(truncateDescription(podcast.description, 150)) }}</p>
        <div class="stats">
          <span>Episodes: {{ podcast.episodes }}</span>
          <span>Rating: {{ podcast.rating }}/5</span>
        </div>
      </div>
    </div>

    <div class="episodes-section">
      <h2>Episodes</h2>
      <div class="episodes-list">
        <div
          v-for="episode in episodes"
          :key="episode.id"
          class="episode-card"
          :class="{ 'playing': currentEpisodeId === episode.id }"
        >
          <img :src="episode.image" :alt="episode.title" class="episode-image">
          <div class="episode-info">
            <h3>{{ episode.title }}</h3>
            <p class="description">{{ removeHtmlTags(truncateDescription(podcast.description, 150)) }}</p>
            <div class="stats">
              <span>{{ (episode.duration)/60 }} mins</span>
            </div>
            <div class="audio-controls">
              <button @click="togglePlay(episode)">
                {{ currentEpisodeId === episode.id && isPlaying ? '⏸ Pause' : '▶ Play' }}
              </button>
              <input
                v-if="currentEpisodeId === episode.id"
                type="range"
                :value="currentTime"
                :max="duration"
                @input="updateProgress"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 隐藏的音频播放器 -->
    <audio ref="audioRef"></audio>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.podcast-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #007bff, #6610f2);
  color: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.podcast-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.podcast-info {
  flex: 1;
}

h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
}

.description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.stats {
  display: flex;
  gap: 2rem;
  font-weight: bold;
}

.episodes-section {
  margin-top: 2rem;
}

h2 {
  margin-bottom: 1.5rem;
}

.episodes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.episode-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out;
}

.episode-card.playing {
  background: #e3f2fd;
  border-left: 5px solid #007bff;
}

.episode-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0056b3;
}

input[type="range"] {
  width: 100%;
  height: 5px;
  background: #ddd;
  border-radius: 5px;
  appearance: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: #007bff;
  border-radius: 50%;
  cursor: pointer;
}

</style>