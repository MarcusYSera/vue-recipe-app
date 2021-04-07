import axios from 'axios';
import authHeader from './auth-header.js';

// swap these
const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_ONE;

export default {
  async createEvent(arr) {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/event/create`,
      arr[0],
      {
        headers: authHeader(),
      }
    );
    return responseBack;
  },
  async getEventsByIdAndDate(arr) {
    arr[1] = arr[1].split('/').join('-');
    let responseBack = await axios.get(
      `${POSTGRES_SERVER}/events/findBy/${arr[0]}/${arr[1]}`,
      {
        headers: authHeader(),
      }
    );
    return responseBack;
  },
};
