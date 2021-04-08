import api from '../../_api/user.service.js';
import router from '../../router';

const state = {
  user: JSON.parse(window.localStorage.getItem('user')),
};

const getters = {
  user: state => state.user,
  isLoggedIn: state => !!state.user,
};

const actions = {
  createUser({ commit }, newUser) {
    return new Promise((resolve, reject) => {
      api
        .createUser(newUser)
        .then(res => {
          commit('setUser', {
            accessToken: res.data.accessToken,
            firstName: res.data.first_name,
          });
          window.localStorage.setItem(
            'user',
            JSON.stringify({
              accessToken: res.data.accessToken,
              firstName: res.data.first_name,
            })
          );
          resolve();
        })
        .catch(err => {
          reject(err.response.data);
        });
    });
  },
  getUserByEmail({ commit }, email) {
    return new Promise((resolve, reject) => {
      api
        .getUserByEmail(email)
        .then(res => {
          commit;
          resolve(res);
        })
        .catch(err => {
          reject(err.response.data);
        });
    });
  },
  login: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      api
        .login(user)
        .then(res => {
          commit('setUser', {
            accessToken: res.data.accessToken,
            firstName: res.data.first_name,
          });
          window.localStorage.setItem(
            'user',
            JSON.stringify({
              accessToken: res.data.accessToken,
              firstName: res.data.first_name,
            })
          );
          resolve(res);
        })
        .catch(err => {
          reject(err.response.data);
        });
    });
  },
  refreshToken: ({ commit }) => {
    return new Promise((resolve, reject) => {
      api
        .retrieveTokenWithRefresh()
        .then(res => {
          commit;
          console.log('success fully refreshed tokens');
          resolve(res);
        })
        .catch(err => {
          reject(err.response.data);
        });
    });
  },
  logout: ({ commit }) => {
    return new Promise((resolve, reject) => {
      api
        .logout()
        .then(res => {
          resolve(res);
          commit('setUser', null);
          window.localStorage.clear();
          router.push('/login');
        })
        .catch(err => {
          reject(err.response.data);
        });
    });
  },
};

const mutations = {
  setUser: (state, newUser) => {
    state.user = newUser;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
