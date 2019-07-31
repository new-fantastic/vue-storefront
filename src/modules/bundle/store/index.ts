import { Module } from 'vuex'
import { BundlesState } from '../types/BundlesState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'

export const module: Module<BundlesState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}