import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'

export const KEY = 'vsf-google-tag-manager'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  store: { modules: [{ key: KEY, module }] },
}

export const VsfGoogleTagManager = new VueStorefrontModule(moduleConfig)
