import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'
import { ContentState } from '../types/ContentState';
import { Module } from 'vuex'

export const module: Module<ContentState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}
