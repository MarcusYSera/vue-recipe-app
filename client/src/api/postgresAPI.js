import axios from 'axios';

// swap these
// const POSTGRES_SERVER = 'http://localhost:8081/v1';
const POSTGRES_SERVER = 'https://localhost.project-melon-bread.com/v1';

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
};
