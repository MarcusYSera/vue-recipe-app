import { expect, server, BASE_URL } from './setup.js';

describe('Messages', () => {
  // it('get messages page', (done) => {
  //   server
  //     .get(`${BASE_URL}/messages`)
  //     .expect(200)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       expect(res.body.messages).to.be.instanceOf(Array);
  //       res.body.messages.forEach((m) => {
  //         expect(m).to.have.property('message_id');
  //         expect(m).to.have.property('message');
  //         expect(m).to.have.property('user_fkid');
  //       });
  //       done();
  //     });
  // });

  it('posts messages', (done) => {
    const data = { userFKID: 1, message: 'new message' };
    server
      .post(`${BASE_URL}/messages`)
      .send(data)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.messages).to.be.instanceOf(Array);
        res.body.messages.forEach((m) => {
          expect(m).to.have.property('message', data.message);
        });
        done();
      });
  });
});
