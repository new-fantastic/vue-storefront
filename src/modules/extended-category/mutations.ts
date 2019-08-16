import * as types from './mutation-types'

export default {

  [types.CATALOG_SET_CHILD_CATEGORIES] (state, payload) {

    state.childCategories = payload

  }

}