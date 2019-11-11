import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import VueAnalytics from 'vue-analytics'
import { router } from '@vue-storefront/core/app'
import { Logger } from '@vue-storefront/core/lib/logger'
import { once } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import ScrollStop from '../util/ScrollStop'
import SendAndSetCurrency from '../util/SendAndSetCurrency'
import InitiateCheckout from '../events/InitiateCheckout'
import AddProduct from '../events/AddProduct';
import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers/optionLabel';

declare const ga;

const state = {
  eventsInQueue: 0
}

export function beforeRegistration ({ Vue, config, store, isServer }) {
  if (config.analytics.id && !isServer) {
    const storeCode = currentStoreView()
    once('__VUE_EXTEND_ANALYTICS__', () => {
      Vue.use(VueAnalytics, {
        id: config.analytics.id,
        router,
        ecommerce: {
          enabled: true,
          enhanced: true
        },
        set: [
          { field: 'currencyCode', value: storeCode.i18n.currencyCode }
        ],
        ready () {
          // Launch hook for initiate checkout
          InitiateCheckout((<any>window).ga, Vue.prototype.$ga.ecommerce)
 
          // Launc hook for AddToCart Custom pack
          EventBus.$on('pack-after-add-to-cart', ({ body }) => {
            AddProduct(Vue.prototype.$ga.ecommerce, {
              id: body.sku,
              name: body.name,
              category: store.state.config.analytics.category,
              variant: body.name,
              price: body.special_price
            }, 'add')
            SendAndSetCurrency((<any>window).ga, Vue.prototype.$ga, 'event', 'UX', 'click', 'add to cart')
          })

          // Launch hook for the purchase
          EventBus.$on('order-after-placed', event => {
            const order = event.order
            const ecommerce = Vue.prototype.$ga.ecommerce
      
            order.products.forEach(item => {
              if (item.isPack) {
                ecommerce.addProduct({
                  id: item.sku,
                  name: item.name,
                  quantity: item.qty,
                  price: item.special_price,
                  variant: item.name,
                  category: store.state.config.analytics.category,
                  ...(item.brand ? { brand: item.brand } : { brand: store.state.config.analytics.defaultBrand })
                })
              } else {
                const colorLabel = optionLabel(store.state.attribute, { attributeKey: 'color', optionId: item.color })
                const tallaLabel = optionLabel(store.state.attribute, { attributeKey: 'talla', optionId: item.talla })
        
                ecommerce.addProduct({
                  id: item.sku,
                  name: item.name,
                  quantity: item.qty,
                  price: item.specialPriceInclTax && item.specialPriceInclTax > 0
                    ? item.specialPriceInclTax
                    : item.priceInclTax,
                  variant: `${colorLabel} ${tallaLabel}`,
                  category: store.state.config.analytics.category,
                  ...(item.brand ? { brand: item.brand } : { brand: store.state.config.analytics.defaultBrand })
                })
              }
            })
      
            // We set them in the Checkout.js before placing an order
            const tax = +localStorage.getItem('tax-persist-before-order')
            const total = +localStorage.getItem('totals-persist-before-order')
            const shipping = +localStorage.getItem('shipping-persist-before-order')
      
            ecommerce.setAction('purchase', {
              id: event.confirmation.magentoOrderId,
              affiliation: 'Jimmy Lion',
              revenue: total - shipping,
              tax,
              shipping
            })

            SendAndSetCurrency((<any>window).ga, Vue.prototype.$ga, 'event', 'Ecommerce', 'Purchase')
          })
        }
      })

      // Counting how many Impressions wait to deliver
      EventBus.$on('ga-add-impression', ({ impression }) => {
        state.eventsInQueue++;
        if (state.eventsInQueue >= 15) {
          state.eventsInQueue = 0
          SendAndSetCurrency(ga, Vue.prototype.$ga, 'event', 'Scroll Tracking', 'scroll', window.location.href)
        }
      })

      ScrollStop(() => {
        setTimeout(() => {
          // Sending them on stop scroll, when there are more than 0 in queue
          if (state.eventsInQueue && state.eventsInQueue > 0) {
            state.eventsInQueue = 0
            SendAndSetCurrency(ga, Vue.prototype.$ga, 'event', 'Scroll Tracking', 'scroll', window.location.href)
          }
        }, 1000)
      })
    })
  } else {
    Logger.warn(
      'Google Analytics extension is not working. Ensure Google Analytics account ID is defined in config',
      'GA'
    )()
  }
}
