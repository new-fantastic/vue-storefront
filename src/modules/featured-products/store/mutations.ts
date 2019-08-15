import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import Vue from 'vue'

export const mutations: MutationTree<any> = {
  [types.SET_PRODUCTS] (state, payload) {
    for (let product of payload) {
      Vue.set(state.products, product.sku, product)
    }
  } 
}