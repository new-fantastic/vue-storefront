import Vue from 'vue'

export const mutations = {
  setContent (state, payload) {
    Vue.set(state, 'content', Array.isArray(payload) ? payload[0] : {})
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
