<script setup lang="ts">
import { useRouter } from 'vue-router';
import { isLoggedIn, logout } from '../utils/auth';

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <div class="user-profile-container">
    <div class="sidebar">
      <nav class="nav-links">
        <router-link to="/subscribe" class="nav-item">订阅</router-link>
        <router-link to="/user/favorites" class="nav-item">收藏</router-link>
        <router-link to="/user/playlists" class="nav-item">播放列表</router-link>
        <button class="nav-item logout-button" @click="handleLogout">退出登录</button>
      </nav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.user-profile-container {
  display: flex;
}

.sidebar {
  width: 250px;
  background: #f5f5f5;
  color: #333;
  padding: 1rem;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-item {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.logout-button {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  text-align: left;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.content {
  flex: 1;
  padding: 2rem;
}
</style>