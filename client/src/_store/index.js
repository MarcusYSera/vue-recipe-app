import { createStore } from 'vuex';

import userModule from './modules/user.module.js';
import eventModule from './modules/event.module.js';

export default createStore({
  modules: { userModule, eventModule },
});
