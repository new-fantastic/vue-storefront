import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'

export function afterRegistration ({ Vue, store, isServer }) {
  AsyncDataLoader.push({
    execute: async ({ route }) => {
      let lang = config.storeViews.mapStoreUrlsFor.some(el => route.name.includes(`${el}-`)) ? 'en' : 'pl'

      // They'll be loaded in parallel
      await Promise.all([
        store.dispatch('wp_rest_content/loadTopNav', { lang: lang }),
        store.dispatch('wp_rest_content/loadTopAlert', { lang: lang }),
        store.dispatch('wp_rest_content/loadBottomMenu', { lang: lang })
      ])

      return null
    }
  })
}
