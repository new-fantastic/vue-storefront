import { SaleProductsState } from '../types/SaleProductsState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import config from 'config'

import axios from 'axios'
import ESQuery from '../helpers/ESQuery'

export const actions: ActionTree<SaleProductsState, any> = {
  
  async list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null }) {
    const commit = context.commit

    let { data } = await axios.get(ESQuery({
      "query": {
        "exists": {
            "field": "special_price"
        }
      }
    }))

    commit(types.FETCH_PRODUCTS, data.hits.hits.map(v => v._source))

  }

}