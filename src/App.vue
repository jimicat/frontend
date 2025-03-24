<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Breadcrumb from './components/Breadcrumb.vue';
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <div class="right-content">
      <main class="main-content">
        <Breadcrumb />
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
.app-container {
  display: flex;
  min-height: 100vh;
}

.right-content {
  flex: 1;
}

.main-content {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
}

.sidebar.collapsed + .right-content .main-content {
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