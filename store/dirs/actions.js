export default {
  async getDirs({ commit }) {
    const response = require('~/mock/dirs.json');
    commit('SET_DIRS', response)
  },
  async changeNode({ commit }, payload) {
    commit('CHANGE_NODE', payload)
  },
  async deleteNode({ commit }, payload) {
    commit('DELETE_NODE', payload)
  },
};
