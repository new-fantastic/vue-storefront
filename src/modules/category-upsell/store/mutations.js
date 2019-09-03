import Vue from 'vue'

export const mutations = {
  setUpsell (state, payload) {
    Vue.set(state, 'products', payload)
  }
}