import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import Vue from 'vue'
import { divideProductNoPlan } from 'src/modules/extended-product/separateByColors'

export const mutations: MutationTree<any> = {
  [types.SET_PRODUCTS] (state, { response, skus }) {

    // Separate by colors later!
    // Target: [sku(from wp)]: product
    let notFound = [...skus]
    for (let configurable of response) {
      if (skus.includes(configurable.sku)) {
        // Found configurable product 
        const requestedParent = {...configurable}
        // Separate by colors
        const separatedProduct = divideProductNoPlan(requestedParent)
        // Set array value
        Vue.set(state.products, configurable.sku, separatedProduct)
        notFound = notFound.filter(v => v !== configurable.sku)
        continue
      }
      if (!configurable.configurable_children) {
        continue;
      }
      for (let child of configurable.configurable_children) {
        if (skus.includes(child.sku)) {
          // Found configurable product 
          const requestedParent = {...configurable}
          // Separate by colors
          const separatedProducts = divideProductNoPlan(requestedParent)
          const productInColor = separatedProducts.find(parent => parent.configurable_children.some(innerChild => innerChild.sku === child.sku))
          if (!productInColor) {
            console.warn('Something went wrong while finding child in color for Featured Product')
            continue
          }
          // We are pushing parent!
          Vue.set(state.products, child.sku, [productInColor])
          notFound = notFound.filter(v => v !== child.sku)
          // Continue > break, because we could have there other requested child
          continue
        }
      }
    }

    if (notFound.length > 0) {
      console.warn('Could not found products for these/this sku:', notFound)
    }
    
  } 
}