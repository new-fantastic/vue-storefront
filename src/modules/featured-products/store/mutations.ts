import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import Vue from 'vue'

export const mutations: MutationTree<any> = {
  [types.SET_PRODUCTS] (state, { response, skus }) {
    let configurableIndex = 1
    if (response[0][0].type_id === 'configurable') {
      configurableIndex = 0
    }

    for (const [ key, parent ] of Object.entries(response[configurableIndex])) {
      response[configurableIndex][key].configurable_children 
        = response[configurableIndex][key].configurable_children.filter(v => skus.includes(v.sku))
          .map(v => response[1 - configurableIndex].find(x => x.sku === v.sku))
    }

    for (let product of response[configurableIndex]) {
      for (let child of product.configurable_children) {
        Vue.set(state.products, child.sku, product)
      }
    }
  } 
}