import { assert, server, BASE_URL } from './setup.js';

describe('Events', () => {
  it('create event', (done) => {
    const data = {
      user_fkid: 1,
      event_name: 'Pasta',
      event_associate_recipe: 'pasta',
      event_description: 'will make clam pasta',
      event_start: '2021-02-06T06:49:00.000Z',
      event_end: '2021-02-07T19:34:00.000Z',
      event_duration: '36:45',
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
        // res.body.events.forEach((e) => {
        // console.log('log from create event');
        // console.log(e);
        // });
        done();
      });
  });

  it('get events page', (done) => {
    server.get(`${BASE_URL}/events`).end((err, res) => {
      // console.log(res.body);
      assert.strictEqual(res.status, 200, '=== response status is 200');
      assert.isArray(res.body.events, 'response body is an array of events');
      // console.log(res.body.events);
      // assert.deepStrictEqual(res.body.events[0], [event_name]);
      res.body.events.forEach((e) => {
        // console.log(e['user_fkid']);
        assert.typeOf(e['user_fkid'], 'number', 'we have a number');
        assert.typeOf(e['event_name'], 'string', 'we have a string');
        assert.typeOf(e['event_associate_recipe'], 'string');
        assert.typeOf(e['event_description'], 'string');
        assert.typeOf(e['event_start'], '');
      });
      done();
    });
  });
});
