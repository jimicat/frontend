<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import { Home, Bell, User, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { watch } from 'vue';
import { isLoggedIn, logout } from '../utils/auth';

const router = useRouter();
const isExpanded = useLocalStorage('sidebarExpanded', true);

const handleLogin = () => {
  if (isLoggedIn.value) {
    router.replace('/user');
  } else {
    router.replace('/login');
  }
};

const handleLogout = () => {
  logout();
  router.replace('/login');
};

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

watch(isLoggedIn, (newValue) => {
  if (newValue) {
    console.log('用户已登录');
    router.replace('/user');
  } else {
    console.log('用户未登录');
    router.replace('/login');
  }
});
</script>

<template>
  <div :class="['fixed left-0 top-0 h-full bg-white text-gray-800 transition-width duration-300 border-r border-gray-300 shadow-lg', { 'w-64': isExpanded, 'w-35': !isExpanded }]">
    <button class="absolute right-[-15px] top-5 bg-white text-gray-800 rounded-full p-1 cursor-pointer text-lg transition-colors duration-200 border border-gray-300 shadow" @click="toggleSidebar">
      <ChevronLeft v-if="isExpanded" class="text-sm" />
      <ChevronRight v-else class="text-sm" />
    </button>
    <div class="flex flex-col h-full">
      <!-- User Info -->
      <div class="flex items-center gap-2 p-5 border-b border-gray-300">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60" alt="User Avatar" class="w-20 h-20 rounded-full">
        <div v-if="isExpanded" class="flex flex-col">
          <span class="font-bold">张三</span>
          <span class="text-sm text-gray-600">已加入 245 天</span>
        </div>
      </div>
      <nav class="flex-1">
        <router-link to="/" class="flex items-center gap-2 px-5 py-2 text-gray-800 rounded transition-colors duration-200 hover:bg-gray-100">
          <Home class="text-xl" />
          <span v-if="isExpanded">首页</span>
        </router-link>
        <router-link to="/episode-trending" class="flex items-center gap-2 px-5 py-2 text-gray-800 rounded transition-colors duration-200 hover:bg-gray-100">
          <Bell class="text-xl" />
          <span v-if="isExpanded">趋势</span>
        </router-link>
        <div class="flex items-center gap-2 px-5 py-2 text-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 cursor-pointer"
          @click="isLoggedIn.value ? handleLogout() : handleLogin()">
          <User class="text-xl" />
          <span v-if="isExpanded">{{ isLoggedIn.value ? '退出' : '登录' }}</span>
        </div>
      </nav>
      <div v-if="isExpanded" class="flex items-center p-5 border-t border-gray-300 mt-auto">
        <span class="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
        <span class="text-sm text-gray-600">版本 1.0.0</span>
      </div>
    </div>
  </div>
</template>