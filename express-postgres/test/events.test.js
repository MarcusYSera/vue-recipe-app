import { assert, server, BASE_URL } from './setup.js';

describe('Events', () => {
  it('get events page', (done) => {
    server.get(`${BASE_URL}/events`).end((err, res) => {
      console.log(res.body);
      assert.strictEqual(res.status, 200, '=== response status is 200');
      assert.isArray(res.body.events, 'response body is an object of events');
      // res.body.events.forEach((e) => {
      //   console.log(e);
      //   assert.property(e, 'user_fkid');
      // });
      done();
    });
  });

  it('creates event', (done) => {
    const data = {
      user_fkid: 1,
      event_name: 'Pasta',
      event_date: '2021-02-08',
      event_start_end: 'end',
      event_time: '09:00-08',
    };
    const id = 1;
    server
      .post(`${BASE_URL}/event/create/${id}`)
      .send(data)
      .end((err, res) => {
        assert.strictEqual(res.status, 200, '=== response from event post request is 200');
        done();
      });
  });
});