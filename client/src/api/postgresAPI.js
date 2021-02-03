import axios from 'axios';

// swap these
const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER;

export default {
  async createUser(newUser) {
    let responseBack = await axios
      .post(`${POSTGRES_SERVER}/users/create`, newUser)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    return responseBack;
  },
  async getUserByEmail(email) {
    let responseBack = await axios
      .get(`${POSTGRES_SERVER}/users/findBy/${email}`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    return responseBack;
  },
  async createEvent(newEvent) {
    console.log('passed vuex, entering api call');
    let responseBack = await axios
      .post(`${POSTGRES_SERVER}/event/create/${newEvent.userId}`, newEvent)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    return responseBack;
  },
};
