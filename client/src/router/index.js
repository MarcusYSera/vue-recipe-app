import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Schedule from '@/views/Schedule';
import Profile from '@/views/Profile';

import SignUp from '@/views/signup/SignUp';
import Login from '@/views/signup/Login';

const routes = [
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
  },
  {
    path: '/recipe',
    name: 'Recipe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Recipe.vue'),
  },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/:pathMatch(.*)*',
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
