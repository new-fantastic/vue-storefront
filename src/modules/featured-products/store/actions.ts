import { FeaturedState } from '../types/FeaturedState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { cacheStorage } from '../'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import builder from 'bodybuilder'

export const actions: ActionTree<FeaturedState, any> = {

  async loadProducts ({ commit }, skus) {
    const query = builder().query('terms', 'sku', skus).build()
    let { items } = await quickSearchByQuery({query})

    commit(types.SET_PRODUCTS, items)
  }
}