import { expect, server, BASE_URL } from './setup';

describe('Users', () => {
  it('get users page', (done) => {
    server
      .get(`${BASE_URL}/users`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.instanceOf(Array);
        res.body.users.forEach((u) => {
          // expect(u).to.have.property('user_id');
          expect(u).to.have.property('first_name');
          expect(u).to.have.property('last_name');
          expect(u).to.have.property('email');
          expect(u).to.have.property('password');
        });
        done();
      });
  });

  it('posts users', (done) => {
    const data = {
      firstName: 'hello',
      lastName: 'world',
      email: 'test@gmail.com',
      password: '1234',
    };
    server
      .post(`${BASE_URL}/users/create`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.instanceOf(Array);
        res.body.users.forEach((u) => {
          // expect(u).to.have.property('user_id');
          expect(u).to.have.property('first_name', data.firstName);
          expect(u).to.have.property('last_name', data.lastName);
          expect(u).to.have.property('email', data.email);
          expect(u).to.have.property('password', data.password);
        });
        done();
      });
  });

  it('updates users', (done) => {
    const data = {
      firstName: 'maiko',
    };
    server
      .post(`${BASE_URL}/users/edit`)
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body.users).to.be.instanceOf(Array);
        done();
      });
  });
});