import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'

export function afterRegistration ({ Vue, store, isServer }) {
  AsyncDataLoader.push({
    execute: async ({ route }) => {
      let lang = config.storeViews.mapStoreUrlsFor.some(el => route.name.includes(`${el}-`)) ? 'en' : 'pl'

      await store.dispatch('wp_rest_content/loadTopNav', { lang: lang })
      // await store.dispatch('wp_rest_content/loadBottomNav', { lang: lang })
      await store.dispatch('wp_rest_content/loadTopAlert', { lang: lang })
      await store.dispatch('wp_rest_content/loadBottomMenu', { lang: lang })

      return null
    }
  })
}
