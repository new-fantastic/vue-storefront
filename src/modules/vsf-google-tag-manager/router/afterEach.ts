import rootStore from '@vue-storefront/store'
import { isServer } from '@vue-storefront/core/helpers'
import { Route } from 'vue-router' 

import evProductClick from '../events/ProductClick'
import evShoppingCard from '../events/ShoppingCard'

export function afterEach (to: Route, from: Route) {
    const currency = rootStore.state.storeView.i18n.currencyCode
  
    // Each product's route has in name 'product' phrase!
    if(!isServer && to.name !== null && from.name !== null) {
        if (to.name.match(/product/)) {
            let source = null
            if(rootStore.state.ui.searchpanel) {
                source = "Search"
            } else if(from.name !== null && from.name.match(/product/)) {
                source = "Related products in other product"
            } else {
                source = "Category page"
            }
            evProductClick(
                rootStore.state.product.current, 
                currency, 
                source
            )
            evShoppingCard(currency)
        }
    }
}