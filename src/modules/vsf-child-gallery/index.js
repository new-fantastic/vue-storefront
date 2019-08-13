import { module } from './store/index.js'
import { createModule } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const KEY = 'vsf-child-gallery'
export const cacheStorage = initCacheStorage(KEY)
export const VsfChildGallery = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
}
)
