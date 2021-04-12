import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './_store';

import axiosInterceptor from './_helpers/interceptors.js';

axiosInterceptor();

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
