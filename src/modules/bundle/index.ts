import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import { actions } from './cart/store/actions'

export const KEY = 'bundle'

export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
}

export const Bundle = new VueStorefrontModule(moduleConfig)
export const extendedCart = {
  key: 'cart',
  store: {
    modules: [{ key: 'cart', module: {
      actions
    } }]
  }
}