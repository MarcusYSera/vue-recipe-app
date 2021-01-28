import axios from 'axios';

const POSTGRES_SERVER = 'http://localhost:8081/v1';

export default {
  async createUser(newUser) {
    let responseBack = await axios
      .post(`${POSTGRES_SERVER}/users/create`, newUser)
      .then(res => {
        // console.log('direct response from server');
        // console.log(res.data.users[0]);
        return res.data.users[0];
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
        // console.log(res.data.users);
        return res.data.users;
      })
      .catch(err => {
        return err;
      });
    return responseBack;
  },
};
