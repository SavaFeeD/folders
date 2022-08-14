export default {
  SET_DIRS(state, payload) {
    state.dirs = payload;
  },
  CHANGE_NODE(state, payload) {
    // ищем нужный обьект с помощью рекурсии и изменяем
    let search = (files) => {
      let isFound = false;
      files.forEach((item) => {
        if (item.id === payload.id) {
          item.name = payload.text;
          isFound = true;
        }
        if (!isFound && !!item.files) search(item.files);
      })

    };
    search(state.dirs);
  },
  DELETE_NODE(state, payload) {
    // ищем нужный обьект с помощью рекурсии и удаляем
    let search = (files) => {
      let isFound = false;
      files.forEach((item, idx) => {
        if (item.id === payload.id) {
          files.splice(idx, 1);
          isFound = true;
        }
        if (!isFound && !!item.files) search(item.files);
      })
    };
    search(state.dirs);
  },
};
