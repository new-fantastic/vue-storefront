import { createModule } from '@vue-storefront/core/lib/module'
import { beforeRegistration } from './hooks/beforeRegistration'
import { beforeEach } from './router/beforeEach'

const store = {
  namespaced: true,
  state: {
    key: null
  }
}

const KEY = 'google-analytics'
export const GoogleAnalytics = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module: store }] },
  beforeRegistration,
  router: { beforeEach }
})
