<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();
const isExpanded = useLocalStorage('sidebarExpanded', true);
const searchQuery = ref('');
const isLoggedIn = useLocalStorage('isLoggedIn', false);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const handleLogin = () => {
  if (isLoggedIn.value) {
    localStorage.removeItem('isLoggedIn');
    isLoggedIn.value = false;
  } else {
    router.push('/login');
  }
};

const handleSearch = () => {
  router.push({
    path: '/search',
    query: { q: searchQuery.value }
  });
  searchQuery.value = '';
};
</script>

<template>
  <div class="sidebar" :class="{ 'collapsed': !isExpanded }">
    <button class="toggle-btn" @click="toggleSidebar">
      {{ isExpanded ? '←' : '→' }}
    </button>
    
    <div class="sidebar-content">
      <!-- Search Section -->
      <div class="search-section">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search..."
          @keyup.enter="handleSearch"
        >
      </div>

      <!-- Navigation Links -->
      <nav class="nav-links">
        <router-link to="/podcast-trending" class="nav-item">
          <span class="icon">📈</span>
          <span class="text" v-show="isExpanded">Podcast Trending</span>
        </router-link>
        
        <router-link to="/episode-trending" class="nav-item">
          <span class="icon">🎧</span>
          <span class="text" v-show="isExpanded">Episode Trending</span>
        </router-link>
      </nav>

      <!-- Login Button -->
      <button class="login-btn" @click="handleLogin">
        <span class="icon">👤</span>
        <span class="text" v-show="isExpanded">
          {{ isLoggedIn ? 'Logout' : 'Login' }}
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
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  width: 250px;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 60px;
}

.toggle-btn {
  position: absolute;
  right: -30px;
  top: 20px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 8px;
  cursor: pointer;
}

.sidebar-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-section input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.search-section input::placeholder {
  color: rgba(255, 255, 255, 0.5);
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
</style>