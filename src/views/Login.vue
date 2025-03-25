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

const handleLogin = async () => {
  try {
    if (email.value && password.value) {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: email.value,
        password: password.value,
      });

      if (response.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        isLoggedIn.value = true;
        router.push('/');
      } else {
        error.value = 'Invalid email or password';
      }
    } else {
      error.value = 'Please enter both email and password';
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.';
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="Enter your email"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            placeholder="Enter your password"
          >
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
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