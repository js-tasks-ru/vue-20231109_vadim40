import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from "../views/PageNotFound.vue";

export const router = createRouter({
  history: createWebHistory('/05-vue-router/02-NotFound'),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: PageNotFound
    },
    {
      path: '/page-a',
      alias: '/',
      component: () => import('../views/PageA'),
    },
    {
      path: '/page-b',
      component: () => import('../views/PageB'),
    },
  ],
});
