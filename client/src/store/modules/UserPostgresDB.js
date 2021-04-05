import api from '../../api/postgresUserAPI';
import router from '../../router';

const state = { user: JSON.parse(window.localStorage.getItem('user')) };

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
          let { user_id, first_name, last_name, email } = res.data.users[0];
          commit('setUser', {
            userId: user_id,
            firstName: first_name,
            lastName: last_name,
            email: email,
          });
          window.localStorage.setItem(
            'user',
            JSON.stringify({
              userId: user_id,
              firstName: first_name,
              lastName: last_name,
              email: email,
            })
          );
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
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
          console.log(err);
          reject(err);
        });
    });
  },
  login: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      api
        .login(user)
        .then(res => {
          console.log(res.data);
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
  logout: ({ commit }) => {
    commit('setUser', null);
    window.localStorage.clear();
    router.push('/login');
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
