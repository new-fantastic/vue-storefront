import { module } from './store'
import { createModule } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const KEY = 'featured-products'
export const cacheStorage = initCacheStorage(KEY)
export const FeaturedProducts = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
}
)
