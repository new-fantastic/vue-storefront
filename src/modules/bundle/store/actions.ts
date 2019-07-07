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

  }//,
  
  // async fetchBoth ({ state, commit }, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null }) {

    
  //   if (state.optionsSecondary === null) {
  //     let secondary = prepareQuery({ queryConfig: 'sockets' })

  //     const sockets = await rootStore.dispatch('product/list', {
  //       query: secondary,
  //       size: 100,
  //       sort: 'created_at:desc',
  //       includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
  //     })

  //     commit(types.SET_SECONDARY, sockets.items)

  //   }

  //   if (state.optionsPrimary === null) {
  //     let primary = prepareQuery({ queryConfig: 'premiumSlippers' })

  //     const premium = await rootStore.dispatch('product/list', {
  //       query: primary,
  //       size: 100,
  //       sort: 'created_at:desc',
  //       includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
  //     })
  //     console.log(premium)

  //     commit(types.SET_PRIMARY, premium.items)

  //   }
  //   console.log('Uwaga', state)

  // }
}