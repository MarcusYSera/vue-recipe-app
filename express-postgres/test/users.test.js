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
});
