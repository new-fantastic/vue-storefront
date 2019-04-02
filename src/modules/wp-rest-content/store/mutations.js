import Vue from 'vue'

export const mutations = {
  setContent (state, payload) {
    Vue.set(state, 'content', payload)
  },
  setTopNav (state, payload) {
    Vue.set(state, 'topNav', payload)
  },
  setBottomNav (state, payload) {
    Vue.set(state, 'bottomNav', payload)
  },
  setTopAlert (state, payload) {
    Vue.set(state, 'topAlert', payload[0] ? payload[0] : null)
  }
}
