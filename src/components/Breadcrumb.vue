<script setup lang="ts">
// 这里可以编写面包屑组件的逻辑
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
  <!-- 这里可以编写面包屑组件的模板 -->
  <div class="breadcrumb">
    <!-- 插入收起与展开按钮代码 -->
    <button class="toggle-btn" @click="toggleSidebar">
      {{ isExpanded ? '收起' : '展开' }}
    </button>
    <div style="margin-left: auto;">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="搜索..."
        @keyup.enter="handleSearch"
      >
      <button @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<style scoped>
/* 这里可以编写面包屑组件的样式 */
.breadcrumb {
  /* 示例样式 */
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.breadcrumb input {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: black;
}
.breadcrumb input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}
</style>