import Vue from 'vue'

export const mutations = {
  setContent (state, payload) {
    // reactivity
    console.log('SET CONTENT')
    Vue.set(state, 'content', payload)
  },
  setTopNav (state, payload) {
    console.log('SET TOP NAV', payload)
    Vue.set(state, 'topNav', payload)
  },
  setBottomNav (state, payload) {
    Vue.set(state, 'bottomNav', payload)
  }
}
