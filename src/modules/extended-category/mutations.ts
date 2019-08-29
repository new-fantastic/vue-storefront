import * as types from "./mutation-types";

export default {
  [types.CATALOG_SET_CHILD_CATEGORIES](state, payload) {
    state.childCategories = payload;
  },

  [types.CATALOG_SET_SORT_ORDER](state, payload) {
    state.sort_order = { ...payload };
  }
};
