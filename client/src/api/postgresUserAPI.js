import axios from 'axios';

const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_TWO;

export default {
  async createUser(newUser) {
    let responseBack = await axios
      .post(`${POSTGRES_SERVER}/users/signup`, newUser)
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
};
