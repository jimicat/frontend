<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, error } from '../utils/auth'; // 从 auth.ts 导入 error 和 login

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  console.log('Attempting login with:', username.value, password.value); // 调试日志
  const success = await login(username.value, password.value);
  if (success) {
    console.log('Login successful'); // 调试日志
    router.replace('/'); // 跳转到主页
  } else {
    console.log('Login failed:', error.value); // 打印错误信息
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">登录</h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input
              id="username"
              name="username"
              type="text"
              v-model="username"
              required
              placeholder="请输入用户名"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              placeholder="请输入密码"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            登录
          </button>
        </div>
      </form>
      <p class="mt-6 text-center text-sm text-gray-600">
        还没有账号？
        <router-link to="/register" class="text-indigo-600 hover:text-indigo-500">注册</router-link>
      </p>
    </div>
  </div>
</template>