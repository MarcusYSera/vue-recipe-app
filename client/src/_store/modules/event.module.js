import api from '../../_api/event.service.js';

const state = {
  selectedDate: null,
  events: null,
  selectedDateForDBQuery: null,
};

const getters = {
  selectedDate: state => state.selectedDate,
  events: state => state.events,
  selectedDateForDBQuery: state => state.selectedDateForDBQuery,
};

const actions = {
  setSelectedDate({ commit }, selectedDate) {
    commit('setSelectedDate', selectedDate);
  },
  setDateForDBQuery({ commit }, truncatedDate) {
    commit('setSelectedDateForDBQuery', truncatedDate);
  },
  getEventsByUserIdDate({ commit }, arr) {
    return new Promise((resolve, reject) => {
      api
        .getEventsByIdAndDate(arr)
        .then(res => {
          console.log(res);
          commit('setEvents', res.data.events);
          resolve(res);
        })
        .catch(err => {
          reject(err.response);
        });

      //   resolve(response);
      //   reject(response);
    });
  },

  createEventByUserId({ commit }, arr) {
    return new Promise((resolve, reject) => {
      api
        .createEvent(arr)
        .then(res => {
          commit;
          resolve(res);
        })
        .catch(err => {
          reject(err.response.data);
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
  setSelectedDateForDBQuery: (state, date) => {
    state.selectedDateForDBQuery = date;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
