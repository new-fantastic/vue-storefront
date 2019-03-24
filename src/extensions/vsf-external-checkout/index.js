import rootStore from '@vue-storefront/store'

const EXTENSION_KEY = 'external-checkout'

export default function (app, router, store, config, root, state) {
  const cmsUrl = config.externalCheckout.cmsUrl

  router.beforeEach((to, from, next) => {
    if (to.name.includes('checkout')) {
      window.location.replace(cmsUrl + rootStore.state.storeView.url + '/vue/cart/sync/token/' + store.state.user.token + '/cart/' + store.state.cart.cartServerToken)
    } else {
      next()
    }
  })

  return {
    EXTENSION_KEY
  }
}
