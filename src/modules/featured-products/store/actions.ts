import { FeaturedState } from '../types/FeaturedState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { cacheStorage } from '../'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import builder from 'bodybuilder'

export const actions: ActionTree<FeaturedState, any> = {

  async loadProducts ({ commit }, skus) {
    const query = builder().orQuery('terms', 'configurable_children.sku', skus)
    .build()
    const query2 = builder().orQuery('terms', 'sku', skus)
    .build()
    let response = await Promise.all([quickSearchByQuery({query}), quickSearchByQuery({query: query2})])

    commit(types.SET_PRODUCTS, {
      response: [response[0].items, response[1].items],
      skus
    })
  }
}