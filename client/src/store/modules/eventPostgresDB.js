import api from '../../api/postgresAPI';

const state = { selectedDate: null, events: null };

const getters = {
  selectedDate: state => state.selectedDate,
  events: state => state.events,
};

const actions = {
  setSelectedDate({ commit }, selectedDate) {
    commit('setSelectedDate', selectedDate);
  },

  getEventsByUserId({ commit }, userId) {
    return new Promise((resolve, reject) => {
      api
        .getEvents(userId)
        .then(res => {
          commit('setEvents', res.data.events);
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  createEventByUserId({ commit }, arr) {
    return new Promise((resolve, reject) => {
      api
        .createEvent(arr)
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
  setSelectedDate: (state, date) => {
    state.selectedDate = date;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
