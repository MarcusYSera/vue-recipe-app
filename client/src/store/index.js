import { createStore } from 'vuex';

import userPostgresDB from './modules/UserPostgresDB';
import eventPostgresDB from './modules/eventPostgresDB';

export default createStore({
  modules: { userPostgresDB, eventPostgresDB },
});
