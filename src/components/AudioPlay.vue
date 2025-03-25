<template>
    <div class="audio-player bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
      <button @click="togglePlay" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
        {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
      </button>
      <div class="flex-1">
        <div class="flex items-center space-x-2">
          <span class="text-gray-600">{{ formatTime(currentTime) }}</span>
          <input
            type="range"
            :value="currentTime"
            :max="duration"
            @input="updateProgress"
            class="w-full"
          />
          <span class="text-gray-600">{{ formatTime(duration) }}</span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span class="cursor-pointer" @click="toggleVolumeSlider">🔈</span>
        <input
          v-if="showVolumeSlider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="volume"
          @input="setVolume($event.target as HTMLInputElement)"
          class="w-24"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    src: {
      type: String,
      required: true
    }
  });
  
  const audioRef = ref<HTMLAudioElement | null>(null);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const volume = ref(0.5);
  const showVolumeSlider = ref(true);
  
  const togglePlay = () => {
    if (!audioRef.value) {
      audioRef.value = new Audio(props.src);
      audioRef.value.volume = volume.value;
  
      audioRef.value.ontimeupdate = () => {
        currentTime.value = audioRef.value!.currentTime;
      };
  
      audioRef.value.onloadedmetadata = () => {
        duration.value = audioRef.value!.duration;
      };
  
      audioRef.value.onended = () => {
        isPlaying.value = false;
        currentTime.value = 0;
      };
    }
  
    if (audioRef.value.paused) {
      audioRef.value.play();
      isPlaying.value = true;
    } else {
      audioRef.value.pause();
      isPlaying.value = false;
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
  
  <style scoped>
  /* Custom styles for the audio controls */
  input[type="range"] {
    appearance: none;
    width: 100%;
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    outline: none;
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
  
  input[type="range"]::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #007bff;
    border-radius: 50%;
    cursor: pointer;
  }
  </style>