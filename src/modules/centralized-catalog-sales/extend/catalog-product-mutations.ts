import * as types from '@vue-storefront/core/modules/catalog/store/product/mutation-types'
import { PagedProductList } from '@vue-storefront/core/modules/catalog/types/ProductState'
import Vue from 'vue'
import rootStore from '@vue-storefront/store';

const productApplyCategorySale = product => {
  const sales = rootStore.state['centralized-catalog-sales'].sales
  const categories = product.category.map(v => v.category_id + "")
  let ps = null

  for(let cId of categories) {

    if(Object.keys(
      sales
    ).includes(cId)) {

      const spc = (product.priceInclTax * ((100 - sales[Number(cId)]) / 100))
      const withoutTax = spc * (product.price/product.priceInclTax)
      const tax = spc - withoutTax 

      ps = {
        ...product,
        price: withoutTax,
        priceInclTax: spc,
        priceTax: tax,
        special_price: product.priceInclTax,
        originalPriceInclTax: product.priceInclTax
      }

      break
    }
  }

  return ps || product
}

export default {
  mutations: {
    [types.CATALOG_UPD_PRODUCTS] (state, { products, append }) {
      if (append === false) {

        state.list = {
          ...products,
          items: products.items.map(product => productApplyCategorySale(product))
        }
      } else {
        (state.list as PagedProductList).start = products.start as number
        (state.list as PagedProductList).perPage = products.perPage as number
        (state.list as PagedProductList).items = 
        (state.list as PagedProductList).items.concat(
          products.items.map(
            product => productApplyCategorySale(product)
          )
        )
      }
    },
    [types.CATALOG_SET_PRODUCT_CURRENT] (state, product) {
      
      state.current = productApplyCategorySale(product)
    },
    [types.CATALOG_SET_PRODUCT_ORIGINAL] (state, product) {
      state.original = productApplyCategorySale(product)
      Vue.prototype.$bus.$emit('product-after-original', { original: product })
    },
    [types.CATALOG_SET_PRODUCT_PARENT] (state, product) {
      state.parent = productApplyCategorySale(product)
      Vue.prototype.$bus.$emit('product-after-parent', { parent: product })
    },
    [types.CATALOG_RESET_PRODUCT] (state, productOriginal) {
      state.current = productApplyCategorySale(productOriginal) || {}
      state.current_configuration = {}
      state.offlineImage = null
      state.parent = null
      state.current_options = {color: [], size: []}
      state.current_bundle_options = {}
      state.current_custom_options = {}
      Vue.prototype.$bus.$emit('product-after-reset', { })
    }
  }
}