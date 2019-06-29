import { SaleProductsState } from '../types/SaleProductsState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import config from 'config'

export const actions: ActionTree<SaleProductsState, any> = {
  
  list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()
    // searchQuery.applyFilter({key: 'priceInclTax', value: {'gt': 0}})

    if (!context.state.products || context.state.products.length === 0) {
      return quickSearchByQuery({ entityType: 'product', query: searchQuery, sort: sort, size: size, start: start, includeFields: includeFields }).then(function (resp) {
        
          // commit(types.FETCH_PRODUCTS, resp.items.filter(v=>true))
          commit(types.FETCH_PRODUCTS, resp.items.filter(product => product.specialPriceInclTax && product.specialPriceInclTax < product.priceInclTax))
          return resp

        }).catch(function (err) {
        console.error(err)
      })
    }

  }

}