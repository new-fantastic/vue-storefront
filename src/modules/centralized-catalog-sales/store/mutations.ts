import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.CCS_STORE] (state, payload) {
    state.sales = payload
  }
}