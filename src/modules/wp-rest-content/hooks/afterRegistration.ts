import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import { getLangByRoute } from '../util/lang'
import config from 'config'

export function afterRegistration ({ Vue, store, isServer }) {
  AsyncDataLoader.push({
    execute: async ({ route }) => {
      let lang = getLangByRoute(route)

      await store.dispatch('wp_rest_content/loadTopNav', { lang: lang })
      await store.dispatch('wp_rest_content/loadTopAlert', { lang: lang })
      await store.dispatch('wp_rest_content/loadBottomMenu', { lang: lang })

      return null
    }
  })
}
