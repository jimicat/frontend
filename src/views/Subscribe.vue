<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Podcast {
  id: number;
  title: string;
  description: string;
}

const subscribedPodcasts = ref<Podcast[]>([]); // Initialize as an empty array with a defined type
const isLoading = ref(true); // Loading state
const errorMessage = ref('');

// Fetch subscriptions from the backend
const fetchSubscriptions = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the user's token
    const response = await axios.get('http://127.0.0.1:5000/api/subscriptions', {
      headers: {
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
    });
    console.log('Subscriptions:', response.data);
    subscribedPodcasts.value = response.data; // Update the subscriptions
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    errorMessage.value = '无法加载订阅数据，请稍后重试。';
  } finally {
    isLoading.value = false; // Stop loading
  }
};

// Unsubscribe from a podcast
const handleUnsubscribe = async (id: number) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://127.0.0.1:5000/api/subscriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    subscribedPodcasts.value = subscribedPodcasts.value.filter(
      (podcast) => podcast.id !== id
    );
    alert('已取消订阅');
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    alert('取消订阅失败，请重试');
  }
};

// Fetch subscriptions when the component is mounted
onMounted(() => {
  fetchSubscriptions();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <div class="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">我的订阅</h1>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center text-gray-600">
        加载中...
      </div>

      <!-- Error Message -->
      <div v-else-if="errorMessage" class="text-center text-red-500">
        {{ errorMessage }}
      </div>

      <!-- Subscribed Podcasts -->
      <div v-else-if="subscribedPodcasts.length > 0" class="space-y-6">
        <div
          v-for="podcast in subscribedPodcasts"
          :key="podcast.id"
          class="bg-gray-50 p-6 rounded-lg shadow-sm flex justify-between items-center"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-700">{{ podcast.title }}</h2>
            <p class="text-gray-600 mt-2">{{ podcast.description }}</p>
          </div>
          <button
            @click="handleUnsubscribe(podcast.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
          >
            取消订阅
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center text-gray-600">
        <p>您还没有订阅任何播客。</p>
      </div>
    </div>
  </div>
</template>