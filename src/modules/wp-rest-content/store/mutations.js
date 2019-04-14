import Vue from 'vue'

export const mutations = {
  setContent (state, { data, slotName }) {
    Vue.set(state.contentSlots, slotName, Array.isArray(data) ? data[0] : data)
  },
  setTopNav (state, payload) {
    Vue.set(state, 'topNav', payload)
  },
  setTopAlert (state, payload) {
    Vue.set(state, 'topAlert', payload)
  },
  setBottomMenu (state, payload) {
    Vue.set(state, 'bottomMenu', payload)
  }
}
