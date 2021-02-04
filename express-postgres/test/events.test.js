import { expect, server, BASE_URL } from './setup.js';

describe('Events', () => {
  it('get events page', (done)=>{
    server.get(`${BASE_URL}/events`)
  })
});
