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

    console.log(state.products)

  //   let configurableIndex = 1
  //   if (response[0][0].type_id === 'configurable') {
  //     configurableIndex = 0
  //   }

  //   for (const [ key, parent ] of Object.entries(response[configurableIndex])) {
  //     for (let kid of response[1 - configurableIndex]) {
  //       const kidSku = kid.sku
  //       const index = response[configurableIndex][key].configurable_children.findIndex(v => v.sku === kidSku)
  //       if (index) {
  //         response[configurableIndex][key].configurable_children[index] = kid
  //         // const desiredColor = kid.name.split(' / ').reverse()[1]
  //       }
  //     }
  //   }

  //   for (let product of response[configurableIndex]) {
  //     for (let child of product.configurable_children) {
  //       if (skus.includes(child.sku))
  //         Vue.set(state.products, child.sku, {
  //           ...product,
  //           configurable_children: product.configurable_children.filter(v => {
  //             const childColor = v.name.split(' / ').reverse()[1].trim()
  //             const targetColor = child.name.split(' / ').reverse()[1].trim()
  //             return targetColor === childColor
  //           })
  //         })
  //     }
  //   }
  } 
}