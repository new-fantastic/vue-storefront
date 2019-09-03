import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {

  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
  },

  [types.FETCH_CERTAIN_PRODUCT] (state, payload) {
    state.current = Array.isArray(payload) ? payload[0] : payload
  }
}