import { FeaturedState } from '../types/FeaturedState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import builder from 'bodybuilder'

export const actions: ActionTree<FeaturedState, any> = {

  async loadProducts ({ commit }, skus) {
    try {
      const query = builder()
      .query('term', 'type_id', 'configurable')
      .orFilter('terms', 'configurable_children.sku', skus)
      .orFilter('terms', 'sku', skus)
      .build()

      let { items } = await quickSearchByQuery({query})

      commit(types.SET_PRODUCTS, {
        response: items,
        skus
      })
    } catch (err) {
      console.error('Featured Products logic -', err)
    }
  }
}