<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const isLoggedIn = useLocalStorage('isLoggedIn', false);

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 201) {
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: email.value,
        password: password.value,
      });

      if (loginResponse.data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        isLoggedIn.value = true;
        router.push('/');
      } else {
        error.value = 'Registration succeeded but login failed. Please try to login manually.';
      }
    } else {
      error.value = 'Registration failed. Please try again.';
    }
  } catch (err) {
    error.value = 'Registration failed. Please try again.';
  }
};
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister" class="register-form">
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
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
            placeholder="Confirm your password"
          >
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.register-card {
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

.register-form {
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

.register-button {
  background: #2c3e50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-button:hover {
  background: #34495e;
}
</style>