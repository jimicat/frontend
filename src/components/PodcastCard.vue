<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Podcast } from '../types/podcast';
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();
const props = defineProps<{
  podcast: Podcast;
}>();

const isSubscribed = ref(false);

// 获取存储在本地的用户 token
const token = localStorage.getItem('token'); 
console.log('token:', token);

// 请求订阅功能
const toggleSubscription = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/api/subscribe',
      { podcast_id: props.podcast.url },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 发送 token 作为认证
        },
      }
    );

    // 如果成功订阅
    if (response.status === 200) {
      isSubscribed.value = !isSubscribed.value; // 更新订阅状态
      alert(isSubscribed.value ? `已订阅: ${props.podcast.title}` : `已取消订阅: ${props.podcast.title}`);
    }
  } catch (error) {
    // 错误处理
    console.error('订阅失败:', error);
    alert('订阅失败，请重试');
  }
};

const showEpisodes = () => {
  router.push(`/podcasts/${props.podcast.id}/episodes/`);
};
</script>

<template>
  <div class="podcast-card cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <img :src="podcast.image" :alt="podcast.title" class="podcast-image w-full h-48 object-cover rounded-lg mb-4">
    <div class="podcast-info">
      <h2 class="text-xl font-semibold text-gray-900">{{ podcast.title }}</h2>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button
        @click="toggleSubscription"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        {{ isSubscribed ? '取消订阅' : '订阅' }}
      </button>
      <button
        @click="showEpisodes"
        class="text-blue-500 hover:underline focus:outline-none"
      >
        查看剧集
      </button>
    </div>
  </div>
</template>
