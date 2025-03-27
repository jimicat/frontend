<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { login, error } from '../utils/auth';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:5000/api/register', {
      username: username.value,
      password: password.value,
    });

    if (response.status === 201) {
      if (await login(username.value, password.value)) {
        router.push('/');
      } else {
        error.value = 'Registration succeeded but login failed. Please try to login manually.';
      }
    } else {
      error.value = response.data.message || 'Registration failed. Please try again.';
    }
  } catch (err) {
    error.value = (err as any).response?.data?.message || 'Registration failed. Please try again.';
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">注册</h2>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
          <input
            id="username"
            type="username"
            v-model="username"
            required
            placeholder="请输入用户名"
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
        <div class="space-y-2">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认密码</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
            placeholder="请再次输入密码"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          注册
        </button>
      </form>
    </div>
  </div>
</template>
