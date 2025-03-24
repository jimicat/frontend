import axios from "axios";
import type { Episode } from "../types/episode";
import type { Podcast } from "../types/podcast";

// const API_BASE_URL = "http://127.0.0.1:8000/api"; // FastAPI 服务器地址
const API_BASE_URL ="https://podapi.ywnote.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // 获取播客列表
  async getPodcasts(): Promise<Podcast[]> {
    try {
      // 发送请求
      const response = await api.get("/podcasts_tending");

      // 打印整个 response 查看结构
      console.log(response);

      // 确保返回的数据结构符合预期
      if (Array.isArray(response.data)) {
        return response.data; // 假设返回的是直接一个播客数组
      } else if (response.data && Array.isArray(response.data.podcasts)) {
        return response.data.podcasts; // 如果返回的是一个对象并包含 podcasts 数组
      } else {
        console.error("返回数据格式错误，未找到 podcasts 数据");
        return [];
      }
    } catch (error) {
      // 捕获请求错误并打印
      console.error("获取播客数据失败:", error);
      return []; // 返回一个空数组，防止程序崩溃
    }
  },

  // 获取播客的所有单集
  async getEpisodes(feedId: number): Promise<Episode[]> {
    try {
      // 发起请求，获取播客单集数据
      const response = await api.get(`podcasts/${feedId}/episodes`);

      // 打印返回的响应数据，查看其结构
      console.log(response);

      // 返回数据中的 episodes
      return response.data;
    } catch (error) {
      console.error("Error fetching episodes:", error);
      return []; // 如果出错，返回一个空数组
    }
  },
  // 获取热门单集列表
  async getEpisodeTrending(): Promise<Episode[]> {
    try {
      // 发送请求
      const response = await api.get("/podcasts/recent_episodes");

      // 打印整个 response 查看结构
      console.log(response);

      // 确保返回的数据结构符合预期
      if (Array.isArray(response.data)) {
        return response.data; // 假设返回的是直接一个单集数组
      } else if (response.data && Array.isArray(response.data.episodes)) {
        return response.data.episodes; // 如果返回的是一个对象并包含 episodes 数组
      } else {
        console.error("返回数据格式错误，未找到 episodes 数据");
        return [];
      }
    } catch (error) {
      // 捕获请求错误并打印
      console.error("获取热门单集数据失败:", error);
      return []; // 返回一个空数组，防止程序崩溃
    }
  },
};
