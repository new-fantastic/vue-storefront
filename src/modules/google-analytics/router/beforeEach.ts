import rootStore from '@vue-storefront/core/store'
import { isServer } from '@vue-storefront/core/helpers'
import { Route } from 'vue-router' 

import InitiateCheckout from '../events/InitiateCheckout'
import { onAnalyticsReady } from 'vue-analytics'

declare const fbq

export function beforeEach (to: Route, from: Route, next) {
    const currency = rootStore.state.storeView.i18n.currencyCode
  
    // Each product's route has in name 'product' phrase!
    if(!isServer && to.name) {
        if (to.name.includes('checkout')) {
            onAnalyticsReady().then(() => {
                InitiateCheckout(fbq, currency)
            })
        }
    }
    next()
}