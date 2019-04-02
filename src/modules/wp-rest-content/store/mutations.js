import Vue from 'vue'

export const mutations = {
  setContent (state, payload) {
    console.log('SET WP DATA')
    Vue.set(state, 'content', Array.isArray(payload) ? payload[0] : {})
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
