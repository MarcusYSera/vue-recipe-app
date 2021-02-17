import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Schedule from '@/views/schedule/Schedule';
import Profile from '@/views/Profile';

import SignUp from '@/views/signup/SignUp';
import Login from '@/views/signup/Login';

const routes = [
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule,
  },
  {
    path: '/recipe',
    name: 'recipe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Recipe.vue'),
  },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/:pathMatch(.*)*',
    name: 'home',
    // path: '*',
    redirect: '/schedule',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // scrollBehavior()
});

export default router;
