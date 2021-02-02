import api from '../../api/postgresAPI';

const state = { events: null };

const getters = {
  events: state => state.events,
};

const actions = {
  getEventsByUserId({ commit }, userId) {
    return new Promise((resolve, reject) => {
      api
        .getEvents(userId)
        .then(res => {
          console.log(res);
          commit;
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  createEventByUserId({ commit }, eventData) {
    return new Promise((resolve, reject) => {
      api
        .createEvent(eventData)
        .then(res => {
          console.log(res);
          commit;
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
  setEvents: (state, newEvent) => {
    state.events = newEvent;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
