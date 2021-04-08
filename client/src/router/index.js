import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Schedule from '@/views/schedule/Schedule';
import Profile from '@/views/profile/Profile';

import SignUp from '@/views/signup/SignUp';
import Login from '@/views/signup/Login';
import Auth from '@/views/signup/Auth';

import Dev from '@/views/dev/Dev';

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
      import(
        /* webpackChunkName: "about" */ '@/views/recipe/RecipeMainDisplay.vue'
      ),
  },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'login', component: Login },
  { path: '/auth', name: 'auth', component: Auth },
  { path: '/dev', name: 'dev', component: Dev },
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/signup', '/login', '/schedule', '/auth'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
