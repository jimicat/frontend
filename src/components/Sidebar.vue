<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();
const isExpanded = useLocalStorage('sidebarExpanded', true); // 默认展开侧边栏
const isLoggedIn = useLocalStorage('isLoggedIn', false);

const handleLogin = () => {
  if (isLoggedIn.value) {
    localStorage.removeItem('isLoggedIn');
    isLoggedIn.value = false;
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <div class="sidebar" :class="{ collapsed: !isExpanded }">
    <div class="sidebar-content">
      <!-- Navigation Links -->
      <nav class="nav-links">
        <router-link to="/podcast-trending" class="nav-item">
          <span class="icon">📈</span>
          <span class="text">Podcast Trends</span>
        </router-link>
        <router-link to="/episode-trending" class="nav-item">
          <span class="icon">🎧</span>
          <span class="text">Episode Trends</span>
        </router-link>
      </nav>
      <!-- Login Button -->
      <button class="login-btn" @click="handleLogin">
        <span class="icon">👤</span>
        <span class="text">
          {{ isLoggedIn ? '退出登录' : '登录' }}
        </span>
      </button>
    </div>
  </div>
</template>


<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #333;
  color: white;
  width: 250px;
  z-index: 1000;
  transition: width 0.3s ease;
}
.sidebar.collapsed {
  width: 60px;
}
/* 切换按钮样式 */
.toggle-btn {
  position: absolute;
  right: -30px;
  top: 20px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.2s;
}
.toggle-btn:hover {
  background-color: #0056b3;
}
.login-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: #007BFF;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.login-btn:hover {
  background-color: #0056b3;
}
.sidebar-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  text-decoration: none;
  color: white;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.icon {
  font-size: 1.2em;
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .icon {
  opacity: 1;
}
.login-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.text {
  white-space: nowrap;
}
.sidebar.collapsed .text {
  display: none;
}
.sidebar.collapsed .nav-links {
  align-items: center;
}
.sidebar.collapsed .login-btn {
  justify-content: center;
  border: none;
}
</style>