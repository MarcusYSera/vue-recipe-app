import { createStore } from 'vuex';

import userPostgresDB from './modules/userPostgresDB';
import eventPostgresDB from './modules/eventPostgresDB';

export default createStore({
  modules: { userPostgresDB, eventPostgresDB },
});
