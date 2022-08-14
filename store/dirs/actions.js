export default {
  // получение данных из мок файла
  async getDirs({ commit }) {
    const response = require('~/mock/dirs.json');
    commit('SET_DIRS', response)
  },
  // изменение
  async changeNode({ commit }, payload) {
    commit('CHANGE_NODE', payload)
  },
  // удаление
  async deleteNode({ commit }, payload) {
    commit('DELETE_NODE', payload)
  },
};
