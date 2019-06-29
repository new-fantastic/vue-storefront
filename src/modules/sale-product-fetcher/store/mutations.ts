import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.FETCH_PRODUCTS] (state, payload) {
    state.products = payload
  },
  [types.MORE_PRODUCTS] (state, payload) {
    state.products.push(...payload)
  }
}