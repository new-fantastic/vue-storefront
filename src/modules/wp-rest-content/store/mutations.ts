import Vue from 'vue'
import * as types from './mutation-types'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<any> = {
  [types.SET_CONTENT] (state, { data, slotName }) {
    Vue.set(state.contentSlots, slotName, Array.isArray(data) ? data[0] : data)
  },
  [types.SET_TOP_NAV] (state, payload) {
    Vue.set(state, 'topNav', payload)
  },
  [types.SET_TOP_ALERT] (state, payload) {
    Vue.set(state, 'topAlert', payload)
  },
  [types.SET_BOTTOM_MENU] (state, payload) {
    Vue.set(state, 'bottomMenu', payload)
  }
}