import Vue from 'vue'

export const mutations = {
  SAVE_CHILDS (state, payload) {
    if(!state.galleries.hasOwnProperty(payload.parentSku)) {
      Vue.set(state.galleries, payload.parentSku, [])
    }
    state.galleries[payload.parentSku].push(...payload.childs)
  }
}