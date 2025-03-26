<template>
  <div class="audio-player fixed bottom-0 bg-gray-900 w-full text-white p-4 flex items-center space-x-4">
    <button @click="togglePlay" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
      {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
    </button>
    <div class="flex-1">
      <div class="flex items-center space-x-2">
        <span class="text-gray-400">{{ formatTime(currentTime) }}</span>
        <input
          type="range"
          :value="currentTime"
          :max="duration"
          @input="updateProgress"
          class="w-full"
        />
        <span class="text-gray-400">{{ formatTime(duration) }}</span>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <span class="cursor-pointer" @click="toggleVolumeSlider">🔈</span>
      <input
        v-if="showVolumeSlider"
        type="range"
        :value="volume"
        @input="setVolume($event.target)"
        class="w-24"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ src: string }>();
const audioRef = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const showVolumeSlider = ref(false);

const togglePlay = () => {
  if (audioRef.value) {
    if (audioRef.value.paused) {
      audioRef.value.play();
      isPlaying.value = true;
    } else {
      audioRef.value.pause();
      isPlaying.value = false;
    }
  }
};

const updateProgress = (event: Event) => {
  if (audioRef.value) {
    const newTime = (event.target as HTMLInputElement).value;
    audioRef.value.currentTime = Number(newTime);
    currentTime.value = Number(newTime);
  }
};

const setVolume = (target: HTMLInputElement | null) => {
  if (audioRef.value && target) {
    const value = parseFloat(target.value);
    audioRef.value.volume = value;
    volume.value = value;
  }
};

const toggleVolumeSlider = () => {
  showVolumeSlider.value = !showVolumeSlider.value;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

watch(() => props.src, (newSrc) => {
  if (audioRef.value) {
    audioRef.value.src = newSrc;
    audioRef.value.play();
    isPlaying.value = true;
  }
});
</script>