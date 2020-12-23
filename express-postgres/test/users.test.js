import { expect, server, BASE_URL } from './setup';

describe('Users', () => {
  it('get users page', (done) => {
    server
      .get(`${BASE_URL}/users`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('posts users', (done) => {
    const data = {
      first_name: 'hello',
      last_name: 'world',
      email: 'test@gmail.com',
      password: '1234',
    };
    server
      .post(`${BASE_URL}/users`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
