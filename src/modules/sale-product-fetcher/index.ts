import { module } from './store'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

export const KEY = 'sale-product-fetcher'

const Example: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
}

export const SaleProductFetcher = new VueStorefrontModule(Example)