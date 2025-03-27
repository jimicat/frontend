import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
// import './style.css'
import "./style/index.css";
import App from "./App.vue";
import PodcastTrending from "./views/PodcastTrending.vue";
import EpisodeTrending from "./views/EpisodeTrending.vue";
import Login from "./views/Login.vue";
import Search from "./views/Search.vue";
import PodcastEpisodes from "./views/PodcastEpisodes.vue";
import Register from "./views/Register.vue";
import UserProfile from "./views/UserProfile.vue"; // Import the UserProfile component
import Subscribe from "./views/Subscribe.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: PodcastTrending,
    },
    {
      path: "/podcast-trending",
      component: PodcastTrending,
    },
    {
      path: "/episode-trending",
      component: EpisodeTrending,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/podcasts/:id/episodes/",
      component: PodcastEpisodes,
    },
    {
      path: "/user",
      component: UserProfile,
      // children: [
      //   {
      //     path: "subscriptions",
      //     component: Subscribe,
      //   }
      // ],
    },
    {
      path: '/user/subscriptions',
      component: Subscribe,
    }
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
