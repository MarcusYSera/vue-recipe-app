import axios from 'axios';

// const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_TWO;
const POSTGRES_SERVER = process.env.VUE_APP_POSTGRES_SERVER_TWO;

axios.interceptors.request.use(req => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});

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
      user,
      { withCredentials: true, credentials: 'include' }
    );
    return responseBack;
  },
  async retrieveTokenWithRefresh() {
    let responseBack = await axios.post(
      `${POSTGRES_SERVER}/users/auth/refresh`,
      {},
      { withCredentials: true, credentials: 'include' }
    );
    return responseBack;
  },
  async logout() {
    let responseBack = await axios.delete(
      `${POSTGRES_SERVER}/users/auth/logout`,
      { withCredentials: true, credentials: 'include' }
    );
    return responseBack;
  },
};
