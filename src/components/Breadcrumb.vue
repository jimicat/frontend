<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  router.push({ path: '/search', query: { q: searchQuery.value } });
  searchQuery.value = '';
};

const isExpanded = useLocalStorage('sidebarExpanded', true); // 默认展开侧边栏
// 切换侧边栏展开状态
const toggleSidebar = () => {
  // 取反当前侧边栏展开状态
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="breadcrumb">
    <button class="toggle-btn" @click="toggleSidebar">
      {{ isExpanded ? '收起' : '展开' }}
    </button>
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="搜索播客..."
        @keyup.enter="handleSearch"
      >
      <button @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.breadcrumb input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: black;
}
.breadcrumb input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}
.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>