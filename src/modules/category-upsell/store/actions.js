import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import builder from 'bodybuilder'

/* eslint-disable */
export const actions = {
  async getUpsell ({commit}, {id}) {

    const query = builder().query('term', 'category_ids', id)
    .filter('term', 'type_id', 'configurable').build()

    const { items } = await quickSearchByQuery({
      query,
      entityType: 'product',
      size: '10'
    })

    commit('setUpsell', items ? items : [])
  }
}
