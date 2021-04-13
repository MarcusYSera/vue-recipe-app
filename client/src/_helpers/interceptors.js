// Axios interceptors
import axios from 'axios';
import store from './../_store';

// import api from './../_api/user.service.js';
let refresh = false;

export default function setup() {
  axios.interceptors.request.use(
    async config => {
      const token = store.getters.user.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // console.log(`${config.method} ${config.url}`);
      return config;
    },
    err => {
      // return Promise.reject(err.response);
      Promise.reject(err.response);
    }
  );
  axios.interceptors.response.use(
    res => res,
    err => {
      if (
        err.response.data.message == 'Token Expired' &&
        err.response.status == 403 &&
        !refresh
      ) {
        refresh = true;
        store
          .dispatch('refreshToken')
          .then(({ status }) => {
            if (status === 200 || status === 204) {
              refresh = false;
              return axios.request(err.config);
            }
          })
          .catch(err => {
            console.error(err);
          });
        console.error('error');
      }
      return Promise.reject(err);
    }
  );
}

// silent refresh

// auth-header
