// Axios interceptors
import axios from 'axios';
import store from './../_store';

export default function setup() {
  axios.interceptors.request.use(
    config => {
      const token = store.getters.user.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      console.log(err);
      return Promise.reject(err);
    }
  );
}

// silent refresh

// auth-header
