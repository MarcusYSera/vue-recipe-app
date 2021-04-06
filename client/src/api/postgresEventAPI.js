import axios from 'axios';

// swap these
// const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_ONE;
const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_ONE_NETWORK;

export default {
  async createEvent(arr) {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/event/create`,
      arr[0],
      {
        headers: { Authorization: `Bearer ${arr[1]}` },
      }
    );
    // .then(res => {
    //   return res;
    // })
    // .catch(err => {
    //   return err;
    // });
    return responseBack;
  },
  async getEventsByIdAndDate(arr) {
    arr[1] = arr[1].split('/').join('-');
    let responseBack = await axios.get(
      `${POSTGRES_SERVER}/events/findBy/${arr[0]}/${arr[1]}`,
      {
        headers: { Authorization: `Bearer ${arr[2]}` },
      }
    );
    // .then(res => {
    //   return res;
    // })
    // .catch(err => {
    //   return err;
    // });
    return responseBack;
  },
};
