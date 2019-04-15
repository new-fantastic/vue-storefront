import { module } from './store'
import { afterRegistration } from './hooks/afterRegistration.ts'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { routes } from './router/routes.ts'

export const KEY = 'wp_rest_content'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }]},
  afterRegistration,
  router: { routes }
}

export const WPRestContent = new VueStorefrontModule(moduleConfig)
 