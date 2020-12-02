import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Schedule from '@/views/Schedule';

const routes = [
  {
    path: '/',
    name: 'Schedule',
    component: Schedule,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior()
});

export default router;
