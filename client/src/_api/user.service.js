import axios from 'axios';

// const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_TWO;
const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_TWO;

export default {
  async createUser(newUser) {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/users/signup`,
      newUser
    );
    return responseBack;
  },
  async getUserByEmail(email) {
    let responseBack = await axios.get(
      `${POSTGRES_SERVER}/users/findBy/${email}`
    );
    return responseBack;
  },
  async login(user) {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/users/auth/login`,
      user
    );
    return responseBack;
  },
  async retrieveTokenWithRefresh() {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/users/auth/refresh`
    );
    return responseBack;
  },
};
