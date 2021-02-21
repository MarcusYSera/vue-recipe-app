import axios from 'axios';

// swap these
const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER;

export default {
  async createUser(newUser) {
    let responseBack = await axios
      .post(`${POSTGRES_SERVER}/users/create`, newUser)
      .then(res => {
        // console.log(res);
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
  async createEvent(arr) {
    console.log('passed vuex, entering api call');
    let responseBack = await axios
      .post(`${POSTGRES_SERVER}/event/create/${arr[0]}`, arr[1])
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    return responseBack;
  },
  async getEventsByIdAndDate(arr) {
    arr[2] = arr[2].split('/').join('-');
    let responseBack = await axios
      .get(`${POSTGRES_SERVER}/events/findBy/${arr[0]}/${arr[1]}/${arr[2]}`)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    return responseBack;
  },
};
