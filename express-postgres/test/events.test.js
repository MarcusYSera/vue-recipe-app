import { assert, server, BASE_URL } from './setup.js';

describe('Events', () => {
  it('get events page', (done) => {
    server.get(`${BASE_URL}/events`).end((err, res) => {
      // console.log(res.body);
      assert.strictEqual(res.status, 200, '=== response status is 200');
      assert.isArray(res.body.events, 'response body is an array of events');
      // res.body.events.forEach((e) => {
      //   console.log(e);
      //   assert.property(e, 'user_fkid');
      // });
      done();
    });
  });

  it('create event', (done) => {
    const data = {
      user_fkid: 1,
      event_name: 'Pasta',
      event_associate_recipe: 'pasta',
      event_description: 'will make clam pasta',
      event_date: '2021-02-06T06:49:00.000Z',
      event_start_end: 'end',
      event_duration: '01:00',
    };
    const id = 1;
    server
      .post(`${BASE_URL}/event/create/${id}`)
      .send(data)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res);
        assert.strictEqual(res.status, 200, '=== response from event post request is 200');
        assert.isArray(res.body.events, 'response body is an array of an objectevents');
        res.body.events.forEach((e) => {
          console.log('log from create event');
          console.log(e);
        });
        done();
      });
  });
});
