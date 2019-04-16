import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'vsf-google-tag-manager'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration
}

export const VsfGoogleTagManager = new VueStorefrontModule(moduleConfig)
