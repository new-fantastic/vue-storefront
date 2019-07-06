import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {

  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
  },

  [types.SET_PRIMARY] (state, payload) {
    state.optionsPrimary = payload
  },

  [types.SET_SECONDARY] (state, payload) {
    state.optionsSecondary = payload
  }

}