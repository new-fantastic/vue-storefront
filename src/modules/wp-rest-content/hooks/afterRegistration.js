import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'

export function afterRegistration ({ Vue, store, isServer }) {
  AsyncDataLoader.push({ // this is an example showing how to call data loader from another module
    execute: async () => {
      await store.dispatch('wp_rest_content/loadTopNav')
      await store.dispatch('wp_rest_content/loadBottomNav')
      await store.dispatch('wp_rest_content/loadTopAlert')

      return null
    }
  })
}
