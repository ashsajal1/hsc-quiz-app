import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/Home.vue";
import AboutView from "./pages/About.vue";
import NotFound from "./pages/NotFound.vue";
import Quiz from "./pages/Quiz.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/about",
    component: AboutView,
    meta: {
      title: "About Us",
      description: "Learn more about us on this page.",
    },
  },
  {
    path: "/quiz",
    component: Quiz,
    meta: {
      title: "Play Quizzes",
      description: "Play quizzes, practice and get golden a plus.",
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
