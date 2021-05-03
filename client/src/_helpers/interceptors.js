import axios from 'axios';
import store from './../_store';
import router from './../router';

let refresh = false;

export default function setup() {
  // auth-header
  axios.interceptors.request.use(
    async config => {
      if (store.getters.isLoggedIn) {
        const token = store.getters.user.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      // console.log(`${config.method} ${config.url}`);
      return config;
    },
    err => {
      // return Promise.reject(err.response);
      Promise.reject(err.response);
    }
  );

  // silent refresh
  axios.interceptors.response.use(
    res => res,
    err => {
      if (
        err.response &&
        err.response.data.message == 'Token Expired' &&
        err.response.status == 403 &&
        !refresh
      ) {
        refresh = true;
        return store
          .dispatch('refreshToken')
          .then(({ status }) => {
            if (status === 200 || status === 204) {
              console.log('token refreshed');
              refresh = false;
              // console.log(status);
              // console.log(err.config);
              return axios.request(err.config);
            }
          })
          .catch(err => {
            // console.error(err);
            return err;
          });
      }
      if (
        (err.response &&
          err.response.status == 403 &&
          err.response.data.message == 'Not Logged In') ||
        (err.response &&
          err.response.status == 403 &&
          err.response.data.message == 'jwt expired')
      ) {
        window.localStorage.clear();
        router.push('/login');
      }
      return Promise.reject(err);
    }
  );
}
