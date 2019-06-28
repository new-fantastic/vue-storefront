import { Module } from 'vuex'
import { SalesState } from '../types/SalesState'
import { mutations } from './mutations'
import { getters } from './getters'
import { actions } from './actions'

export const module: Module<SalesState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters
}