import { createStore } from 'vuex';

import postgresUserDB from './modules/postgresUserDB';

export default createStore({
  modules: { postgresUserDB },
});
