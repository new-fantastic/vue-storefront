import rootStore from '@vue-storefront/store'

const EXTENSION_KEY = 'external-checkout'

export default function (app, router, store, config, root, state) {
  const cmsUrl = config.externalCheckout.cmsUrl

  router.beforeEach((to, from, next) => {
    if ('name' in to && to.name.includes('checkout')) {
      // cmsUrl ends with /
      // langPath starts with / So I had to remove first char from that by substr(1)
      const langPath = rootStore.state.storeView.url ? rootStore.state.storeView.url.substr(1) + '/' : ''

      window.location.replace(cmsUrl + langPath + 'vue/cart/sync/token/' + store.state.user.token + '/cart/' + store.state.cart.cartServerToken)
      // https://checkout.localheroesstore.com/vue/cart/sync/token//cart/ CART_TOKEN
    } else {
      next()
    }
  })

  return {
    EXTENSION_KEY
  }
}
