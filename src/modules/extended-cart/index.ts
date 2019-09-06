import { router } from '@vue-storefront/core/app'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'

const extendCartVuex = {
  actions: {
    goToCheckout (context) {
      const { storeCode } = currentStoreView()
      if (storeCode === 'pl') {
        router.push({ name: 'pl-zamowienie' })
      } else {
        router.push({ name: 'en-checkout' })
      }
    }
  }
 }

 export const cartExtend = {
  key: 'cart',
  store: { modules: [{ key: 'cart', module: extendCartVuex }] },
 }