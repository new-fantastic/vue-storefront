import Vue from 'vue'

export const mutations = {
  setContent (state, payload) {
    // reactivity
    Vue.set(state, 'content', payload)
  },
  setLayout (state, payload) {
    state.layout = payload
  }
}
