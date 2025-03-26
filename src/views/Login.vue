<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, error } from '../utils/auth';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  if (await login(email.value, password.value)) {
    router.replace('/');
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">登录</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="请输入邮箱"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="请输入密码"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          登录
        </button>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        还没有账号？<router-link to="/register" class="text-indigo-600 hover:text-indigo-500">注册</router-link>
      </p>
    </div>
  </div>
</template>