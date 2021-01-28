import api from '../../api/postgresAPI';
// import router from '../../router';

const state = { user: null };

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
            id: user_id,
            firstName: first_name,
            lastName: last_name,
            email: email,
          });
          window.localStorage.setItem('user', {
            id: user_id,
            firstName: first_name,
            lastName: last_name,
            email: email,
          });
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
          if (res.data.users.length > 0) {
            let { user_id, first_name, last_name, email } = res.data.users[0];
            commit('setUser', {
              id: user_id,
              firstName: first_name,
              lastName: last_name,
              email: email,
            });
            window.localStorage.setItem('user', {
              id: user_id,
              firstName: first_name,
              lastName: last_name,
              email: email,
            });
          }
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  logout: ({ commit }) => {
    commit('setUser', null);
    window.localStorage.clear();
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
