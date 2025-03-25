<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();
const isExpanded = useLocalStorage('sidebarExpanded', true); // 默认展开侧边栏
const isLoggedIn = useLocalStorage('isLoggedIn', false);

const handleLogin = () => {
  if (isLoggedIn.value) {
    router.push('/user');
  } else {
    router.push('/login');
  }
};

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="sidebar" :class="{ collapsed: !isExpanded }">
    <!-- <button class="toggle-btn" @click="toggleSidebar">
      {{ isExpanded ? '<<' : '>>' }}
    </button> -->
    <div class="sidebar-content">
      <!-- User Info -->
      <div class="user-info">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60" alt="User Avatar" class="avatar">
        <div class="user-details" v-if="isExpanded">
          <span class="username">张三</span>
          <span class="joined-date">已加入 245 天</span>
        </div>
      </div>
      <!-- Navigation Links -->
      <nav class="nav-links">
        <router-link to="/podcast-trending" class="nav-item">
          <span class="icon">🏠</span>
          <span class="text" v-if="isExpanded">发现</span>
        </router-link>
        <router-link to="/episode-trending" class="nav-item">
          <span class="icon">🔔</span>
          <span class="text" v-if="isExpanded">订阅</span>
        </router-link>
        <div class="nav-item" @click="handleLogin">
          <span class="icon">👤</span>
          <span class="text" v-if="isExpanded">我的</span>
        </div>
      </nav>
      <div class="version-info" v-if="isExpanded">
        <span class="status-dot"></span>
        <span class="version-text">版本 1.0.0</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #fff;
  color: #333;
  width: 250px;
  z-index: 1000;
  transition: width 0.3s ease;
  border-right: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.sidebar.collapsed {
  width: 60px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-details {
  display: flex;
  flex-direction: column;
}
.username {
  font-weight: bold;
}
.joined-date {
  font-size: 0.8em;
  color: #666;
}
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: background-color 0.2s;
  cursor: pointer;
}
.nav-item:hover {
  background-color: #f0f0f0;
}
.icon {
  font-size: 1.2em;
}
.version-info {
  display: flex;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #ddd;
  margin-top: auto;
}
.status-dot {
  width: 10px;
  height: 10px;
  background-color: #28a745;
  border-radius: 50%;
  margin-right: 10px;
}
.version-text {
  font-size: 0.9em;
  color: #666;
}
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
}
/* .login-btn:hover {
  background-color: #007BFF;
} */
</style>