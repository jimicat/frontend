import { ref } from 'vue';
import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';

const isLoggedIn = useLocalStorage('isLoggedIn', false); // 登录状态
const error = ref(''); // 响应式错误信息
const token = useLocalStorage('token', ''); // 存储 JWT 令牌

const login = async (username: string, password: string): Promise<boolean> => {
  error.value = ''; // 清空之前的错误信息
  try {
    const response = await axios.post(
      'http://127.0.0.1:5000/api/login',
      { username, password }
    );

    if (response.data.token) { 
      token.value = response.data.token; // 存储 JWT 令牌
      isLoggedIn.value = true; // 更新登录状态
      localStorage.setItem('isLoggedIn', 'true'); // 确保状态持久化
      localStorage.setItem('token', response.data.token); // 存储 Token
      return true;
    } else {
      error.value = '登录失败，服务器未返回 Token';
      return false;
    }
  } catch (err) {
    console.error('Login error:', err);
    error.value = (err as any).response?.data?.error || '登录失败，请重试。';
    return false;
  }
};

const logout = (): void => {
  localStorage.removeItem('isLoggedIn'); // 清除本地存储
  localStorage.removeItem('token'); // 删除 Token
  isLoggedIn.value = false;
  token.value = ''; // 清空 JWT 令牌
};

export { isLoggedIn, error, token, login, logout };
