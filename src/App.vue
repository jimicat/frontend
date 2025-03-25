<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1">
      <main class="ml-64 transition-all duration-300 relative">
        <keep-alive>
          <router-view class="pt-20 h-screen"></router-view>
        </keep-alive>
      </main>
    </div>
  </div>
</template>