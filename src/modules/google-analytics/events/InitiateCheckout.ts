import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers/optionLabel'
import { VueAnalytics } from 'src/modules/google-analytics/types/VueAnalytics'
import rootStore from '@vue-storefront/core/store';

export default (windowGa: any, ecommerce: VueAnalytics) => {

  EventBus.$on('checkout-after-created', async () => {

    if (!windowGa || !ecommerce || !ecommerce.addProduct) {
      return
    }

    rootStore.state.cart.cartItems.forEach(item => {

      if (item.isPack) {
        ecommerce.addProduct({
          id: item.sku,
          name: item.name,
          quantity: item.qty,
          price: item.special_price,
          variant: item.name,
          category: rootStore.state.config.analytics.category,
          ...(item.brand ? { brand: item.brand } : { brand: rootStore.state.config.analytics.defaultBrand })
        })
      } else {
        const colorLabel = optionLabel(rootStore.state.attribute, { attributeKey: 'color', optionId: item.color })
        const tallaLabel = optionLabel(rootStore.state.attribute, { attributeKey: 'talla', optionId: item.talla })

        ecommerce.addProduct({
          id: item.sku,
          name: item.name,
          quantity: item.qty,
          price: item.priceInclTax,
          variant: `${colorLabel} ${tallaLabel}`,
          category: rootStore.state.config.analytics.category,
          ...(item.brand ? { brand: item.brand } : { brand: rootStore.state.config.analytics.defaultBrand })
        })
      }
    })

    ecommerce.setAction('checkout')
    windowGa('send', 'event', 'Ecommerce', 'InitiateCheckout')

  })
}