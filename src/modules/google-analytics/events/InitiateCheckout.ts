import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import { VueAnalytics } from 'src/modules/google-analytics/types/VueAnalytics'
import rootStore from '@vue-storefront/core/store';

export default (windowGa: any, ecommerce: VueAnalytics) => {

  EventBus.$on('checkout-after-created', async () => {

    if (!windowGa || !ecommerce || !ecommerce.addProduct) {
      return
    }

    rootStore.state.cart.cartItems.forEach(item => {

      ecommerce.addProduct({
        id: item.sku,
        name: item.name,
        quantity: item.qty,
        price: item.special_price,
        variant: item.childName,
        category: rootStore.state.config.analytics.category,
        ...(item.brand ? { brand: item.brand } : { brand: rootStore.state.config.analytics.defaultBrand })
      })

    })

    ecommerce.setAction('checkout')
    windowGa('send', 'event', 'Ecommerce', 'InitiateCheckout')

  })
}