import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'
import extendProductMutations from './extend/catalog-product-mutations'

export const KEY = 'centralized-catalog-sales'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  afterRegistration
}

export const CentralizedCatalogSales = new VueStorefrontModule(moduleConfig)

export const productExtend = {
  key: 'catalog',
  store: {
    modules: [{ key: 'product', module: extendProductMutations }]
  }
}