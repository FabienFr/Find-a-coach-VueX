import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  //we don't merge it in the global store
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  mutations,
  // as key / value pairs
  actions,
  getters
};
