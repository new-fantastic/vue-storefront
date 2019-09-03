import { BundlesState } from '../types/BundlesState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import config from 'config'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import rootStore from '@vue-storefront/core/store'
import axios from 'axios'
import ESQuery from '../helpers/ESQuery'

export const actions: ActionTree<BundlesState, any> = {

  async fetchBundleProducts ({ commit }) {

    try {

      let { data } = await axios.get(ESQuery({
        "query": {
          "bool": {
            "must": [
              { "term": {
                  "type_id": {
                    "value": "bundle",
                    "boost": 1.0
                  }
                } 
              }
            ]
          }
        }
      }))

      commit(types.FETCH_PRODUCTS, data.hits.hits.filter(v => v._source.price === 0)
        .map(v => v._source)
      )

    } catch (e) {
      console.error('Error')
    }

  },

  async fetchCertainBundle ({ commit }, sku) {

    try {

      let { data } = await axios.get(ESQuery({
        "query": {
          "bool": {
            "must": [
              { "term": {
                  "type_id": {
                    "value": "bundle",
                    "boost": 1.0
                  }
                } 
              },
              { "term": {
                "sku": {
                  "value": sku,
                  "boost": 1.0
                }
              } 
            }
            ]
          }
        }
      }))

      commit(types.FETCH_CERTAIN_PRODUCT, data.hits.hits.filter(v => v._source.price === 0)
        .map(v => v._source)
      )

    } catch (e) {
      console.error('Error')
    }

  }
}