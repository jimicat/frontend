<script setup lang="ts">
import { useRouter } from 'vue-router';
import { logout } from '../utils/auth';

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <div class="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">用户中心</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 收藏 Section -->
        <div class="bg-blue-50 p-4 rounded-lg shadow-sm text-center">
          <h2 class="text-lg font-semibold text-blue-600 mb-2">收藏</h2>
          <router-link
            to="/user/favorites"
            class="text-blue-500 hover:underline"
          >
            查看收藏
          </router-link>
        </div>

        <!-- 订阅 Section -->
        <div class="bg-green-50 p-4 rounded-lg shadow-sm text-center">
          <h2 class="text-lg font-semibold text-green-600 mb-2">订阅</h2>
          <router-link
            to="/user/subscriptions"
            class="text-green-500 hover:underline"
          >
            管理订阅
          </router-link>
        </div>

        <!-- 退出登录 Section -->
        <div class="bg-red-50 p-4 rounded-lg shadow-sm text-center">
          <h2 class="text-lg font-semibold text-red-600 mb-2">退出登录</h2>
          <button
            @click="handleLogout"
            class="text-red-500 hover:underline focus:outline-none"
          >
            点击退出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here if needed */
</style>