import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'
import { ProductData } from '../types/ProductData'
import productCategoryName from '../util/productCategoryName'
import sizeIdToLabel from '../util/sizeIdToLabel'
import rootStore from '@vue-storefront/store'

declare const dataLayer

export default (currency): void => {
    let myDebounceOnAdd:(Function | null) = null 
    let myDebounceOnDelete:(Function | null) = null 

    // Product first time added to cart
    EventBus.$on('cart-before-add', product => {
        if(!myDebounceOnAdd) {
            myDebounceOnAdd = debounce(() => {
                if(!rootStore.state.ui.searchpanel) {
                  return
                }

                const pr = product.product
                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: sizeIdToLabel(pr.size),
                    brand: "Kubota",
                    category: categoryName
                  }
        
                  dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                      'currencyCode': currency,
                      'add': {                                // 'add' actionFieldObject measures.
                        'products': [productData]
                      }
                    }
                  })
            }, 2000)
        }
        myDebounceOnAdd(product.product)
    })

    EventBus.$on('cart-before-itemchanged', product => {
        if(!myDebounceOnAdd) {
            myDebounceOnAdd = debounce(() => {
                const pr = product.product
                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: sizeIdToLabel(pr.size),
                    brand: "Kubota",
                    category: categoryName
                  }
        
                  dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                      'currencyCode': currency,
                      'add': {                                // 'add' actionFieldObject measures.
                        'products': [productData]
                      }
                    }
                  })
            }, 1000)
        }

        if(myDebounceOnAdd && product.item.qty > 1 && product.item.prev_qty < product.item.qty) {
            myDebounceOnAdd(product.product)
        } 
    })

    EventBus.$on('cart-before-delete', product => {
        if(!myDebounceOnDelete) {
            myDebounceOnDelete = debounce(() => {
                const pr = product.items[0]
                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: sizeIdToLabel(pr.size),
                    brand: "Kubota",
                    category: categoryName
                  }
        
                  dataLayer.push({
                    'event': 'removeFromCart',
                    'ecommerce': {
                      'remove': {     
                        'products': [productData]
                      }
                    }
                  })
            }, 1000)
        }

        if(myDebounceOnDelete){
            myDebounceOnDelete(product.product)
        }
    })
}