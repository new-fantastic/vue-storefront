import { Module } from 'vuex'
import { SaleProductsState } from '../types/SaleProductsState'
import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'

export const module: Module<SaleProductsState, any> = {
  namespaced: true,
  mutations,
  actions,
  state
}