import api from '../../api/postgresAPI';

const state = { user: null };

const getters = { user: state => state.user };

const actions = {
  createUser: ({ commit }, newUser) => {
    return new Promise((resolve, reject) => {
      // console.log('vuex newUserArr');
      // console.log(newUserArr);
      api
        .createUser(newUser)
        .then(res => {
          // console.log('res back from api response');
          // console.log(res);
          commit('setNewUser', {
            id: res.user_id,
            firstName: res.first_name,
            lastName: res.last_name,
            email: res.email,
          });
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
};

const mutations = {
  setNewUser: (state, newUser) => {
    state.user = newUser;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
