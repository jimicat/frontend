import { ref } from 'vue';
import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';

const isLoggedIn = useLocalStorage('isLoggedIn', false);
const error = ref('');

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login/', { email, password });
    if (response.data.message === 'Login successful') {
      localStorage.setItem('isLoggedIn', 'true');
      isLoggedIn.value = true;
      return true;
    } else {
      error.value = response.data.message || '邮箱或密码错误';
      return false;
    }
  } catch (err) {
    error.value = (err as any).response?.data?.message || '登录失败，请重试。';
    return false;
  }
};

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn.value = false;
};

export { isLoggedIn, error, login, logout };