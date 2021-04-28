import axios from 'axios';

const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_ONE;

export default {
  async createEvent(arr) {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/event/create`,
      arr[0]
    );
    return responseBack;
  },
  // async getEventsByIdAndDate(arr) {
  //   arr[1] = arr[1].split('/').join('-');
  //   let responseBack = await axios.get(
  //     `${POSTGRES_SERVER}/events/findBy/${arr[0]}/${arr[1]}`,
  //     {
  //       headers: authHeader(),
  //     }
  //   );
  //   console.log(responseBack);
  //   return responseBack;
  // },
  getEventsByIdAndDate(arr) {
    arr[1] = arr[1].split('/').join('-');
    return axios
      .get(`${POSTGRES_SERVER}/events/findBy/${arr[0]}/${arr[1]}`)
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.error(err.response.data.message);
        // throw err.response.data.message;
      });
  },
};
