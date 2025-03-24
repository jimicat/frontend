<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Breadcrumb from './components/Breadcrumb.vue';
</script>

<template>
  <div class="app-container">
    <Sidebar />
    <div class="right-content">
      <main class="main-content">
        <Breadcrumb class="breadcrumb" />
        <keep-alive>
          <router-view class="view-container"></router-view>
        </keep-alive>
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
  position: relative;
}

.view-container {
  padding-top: 80px !important;
  height: 100vh;
  overflow-y: scroll;
}

.sidebar.collapsed + .right-content .main-content {
  margin-left: 60px;
}

.breadcrumb {
 position: absolute; 
 width: 100%;
 background-color: #fff;
 z-index: 1;
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