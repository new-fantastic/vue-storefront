import * as types from '@vue-storefront/core/modules/catalog/store/product/mutation-types'
import { PagedProductList } from '@vue-storefront/core/modules/catalog/types/ProductState'
import ApplyCategorySale from '../util/ApplyCategorySale'
import Vue from 'vue'

export default {
  mutations: {
    [types.CATALOG_UPD_RELATED] (state, { key, items }) {
      state.related[key] = items.map(
        product => ApplyCategorySale(product)
      )
      Vue.prototype.$bus.$emit('product-after-related', { key: key, items: items })
    },
    [types.CATALOG_UPD_PRODUCTS] (state, { products, append }) {
      if (append === false) {

        state.list = {
          ...products,
          items: products.items.map(product => ApplyCategorySale(product))
        }
      } else {
        (state.list as PagedProductList).start = products.start as number
        (state.list as PagedProductList).perPage = products.perPage as number
        (state.list as PagedProductList).items = 
        (state.list as PagedProductList).items.concat(
          products.items.map(
            product => ApplyCategorySale(product)
          )
        )
      }
    },
    [types.CATALOG_SET_PRODUCT_CURRENT] (state, product) {

      state.current = ApplyCategorySale(product)

    }
  }
}