import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'
import { SET_LANG } from '../store/mutation-types'
import { getLangByRoute } from '../util/GetLang'

export function afterRegistration ({ Vue, store, isServer }) {
  AsyncDataLoader.push({
    execute: async ({ route }) => {
      store.commit(`wp_rest_content/${SET_LANG}`, getLangByRoute(route))
      
      // They'll be loaded in parallel
      // await Promise.all([
      //   store.dispatch('wp_rest_content/loadTopNav'),
      //   store.dispatch('wp_rest_content/loadTopAlert'),
      //   store.dispatch('wp_rest_content/loadBottomMenu')
      // ])
    }
  })
}
