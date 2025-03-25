<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoggedIn = useLocalStorage('isLoggedIn', false);

// 处理登录逻辑
const handleLogin = async () => {
  try {
    // 检查是否输入了邮箱和密码
    if (email.value && password.value) {
      // 发送登录请求到后端
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: email.value,
        password: password.value,
      });
      console.log('登录响应:', response.data);
      // 如果登录成功
      if (response.data.success) {
        // 将登录状态存储在 localStorage 中
        localStorage.setItem('isLoggedIn', 'true');
        isLoggedIn.value = true;
        console.log('登录成功，重定向到主页...');
        // 重定向到主页
        router.push('/');
      } else {
        // 如果登录失败，显示错误信息
        error.value = response.data.message || '邮箱或密码错误';
      }
    } else {
      // 如果没有输入邮箱或密码，显示错误信息
      error.value = '请输入邮箱和密码';
    }
  } catch (err) {
    // 捕获并处理登录错误
    console.error('登录错误:', err);
    error.value = (err as any).response?.data?.message || '登录失败，请重试。';
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="请输入邮箱"
          >
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="请输入密码"
          >
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="login-button">登录</button>
      </form>
      <p>还没有账号？<router-link to="/register">注册</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  margin: 0 auto;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #666;
  font-size: 0.9rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.error {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.login-button {
  background: #2c3e50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background: #34495e;
}
</style>