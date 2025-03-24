<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed + .main-content {
  margin-left: 60px;
}

body {
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

#app {
  max-width: none;
  margin: 0;
  padding: 0;
}
</style>