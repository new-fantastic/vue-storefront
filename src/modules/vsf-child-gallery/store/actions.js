import fetch from 'isomorphic-fetch'
import config from 'config'
import builder from 'bodybuilder'
import { divideProduct } from '../../../themes/nago-theme/mixins/separateByColors'
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export const actions = {

  async loadChildsGalleries ({ commit }, product) {

    if(product.type_id !== 'configurable')
      return

    const fakeGenerator = {
      next() {
        return {
          value: 1
        }
      }
    }
    const skus = divideProduct(product, fakeGenerator).map(v => v.sku)
    const query = builder().query('terms', 'sku', skus)
      .filter('term', 'type_id', 'simple')
      .build()

    const include_fields = ['media_gallery', 'color']
    const { elasticsearch } = currentStoreView()
    const apiUrl = config.api.url.substr(-1) === '/' ? config.api.url : config.api.url+'/'
    const baseUrl = `${apiUrl}api/catalog/${elasticsearch.index}/product/_search?_source_include=`
    const requestUrl = baseUrl + include_fields.join('%2C') + '&request=' + JSON.stringify(query)

    let response = await fetch(requestUrl)
    let body = await response.json()

    const childs = body.hits.hits.map(v => v._source).map(v => ({
      media_gallery: v.media_gallery,
      color: v.color
    }))

    commit('SAVE_CHILDS', {
      parentSku: product.sku,
      childs
    })

  },

  async loadProduct ({ commit }, sku) {

    const query = builder().query('term', 'sku', sku).build()

    const { elasticsearch } = currentStoreView()
    const apiUrl = config.api.url.substr(-1) === '/' ? config.api.url : config.api.url+'/'
    const baseUrl = `${apiUrl}api/catalog/${elasticsearch.index}/product/_search?request=` + JSON.stringify(query)

    let response = await fetch(baseUrl)
    let body = await response.json()
    return body.hits.hits.map(v => v._source)[0]

  }
}