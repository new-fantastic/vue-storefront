// import { quickSearchByQuery } from '../../lib/search'
// import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import axios from 'axios'
import config from 'config'

/* eslint-disable */
export const actions = {
  async getUpsell ({commit}, {id}) {
    const query = {
      "query": {
        "bool": {
          "filter": {
            "bool": {
              "must": [
                {
                  "terms": {
                    "category.category_id": [
                      id
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    } 

    let res = await axios.post(`${config.elasticsearch.host}/${config.elasticsearch.index}/product/_search`, query)

    commit('setUpsell', res.data.hits.hits ? res.data.hits.hits : [])
  }
}
