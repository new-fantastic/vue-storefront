import { Module } from 'vuex'
import { FeaturedState } from '../types/FeaturedState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'
import { state } from './state'

export const module: Module<FeaturedState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
}