import { Module } from 'vuex'
import { mutations } from './mutations'
import { WPRState } from '../types/WPRState'
import { actions } from './actions'
import { state } from './state'

export const module: Module<WPRState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}
