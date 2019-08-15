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
      for (let kid of response[1 - configurableIndex]) {
        const kidSku = kid.sku
        const index = response[configurableIndex][key].configurable_children.findIndex(v => v.sku === kidSku)
        if (index) {
          response[configurableIndex][key].configurable_children[index] = kid
          // const desiredColor = kid.name.split(' / ').reverse()[1]
        }
      }
    }

    for (let product of response[configurableIndex]) {
      for (let child of product.configurable_children) {
        if (skus.includes(child.sku))
          Vue.set(state.products, child.sku, {
            ...product,
            configurable_children: product.configurable_children.filter(v => {
              const childColor = v.name.split(' / ').reverse()[1].trim()
              const targetColor = child.name.split(' / ').reverse()[1].trim()
              return targetColor === childColor
            })
          })
      }
    }
  } 
}