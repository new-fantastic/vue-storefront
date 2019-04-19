import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'
import { ProductData } from '../types/ProductData'
import productCategoryName from '../util/productCategoryName'
import sizeIdToLabel from '../util/sizeIdToLabel'
import rootStore from '@vue-storefront/store'
import { Queue } from '../structures/queue'

declare const dataLayer

export default (currency): void => { 
    let myDebounceOnAdd:(Function | null) = null 
    let myDebounceOnDelete:(Function | null) = null 

    // Product first time added to cart
    EventBus.$on('cart-before-add', product => {
        if(!myDebounceOnAdd) {
            myDebounceOnAdd = debounce((product) => {
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
                    variant: pr.sku.split('-')[1],
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
        myDebounceOnAdd(product)
    })

    EventBus.$on('cart-before-itemchanged', product => {
        if(!myDebounceOnAdd) {
            myDebounceOnAdd = debounce((product) => {
                const pr = product.product || product.item
                console.log('CHANGE', product)

                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: pr.sku.split('-')[1],
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
            myDebounceOnAdd(product)
        } 
    })

    let queue = new Queue<ProductData>()
    let lastProducts = null

    EventBus.$on('cart-before-delete', product => {
        lastProducts = product
        if(!myDebounceOnDelete) {
            myDebounceOnDelete = debounce((product) => {
                console.log('delete', product)
                const pr = product.items[0]

                let categoryName = productCategoryName(pr)
                 
                  const productData: ProductData = {
                    name: pr.name,
                    id: pr.sku,
                    price: pr.priceInclTax,
                    quantity: pr.qty,
                    variant: pr.sku.split('-')[1],
                    brand: "Kubota",
                    category: categoryName
                  }
        
                  // dataLayer.push({
                  //   'event': 'removeFromCart',
                  //   'ecommerce': {
                  //     'remove': {     
                  //       'products': [productData]
                  //     }
                  //   }
                  // })

                  queue.push(productData)
            }, 2000)
        }

        myDebounceOnDelete(product)
    })

    EventBus.$on('cart-after-delete', products => {
      console.log(lastProducts, products);
      // if(myDebounceOnDelete) {
        // if(JSON.stringify(lastProducts) === JSON.stringify(products)) {
        //   return;
        // }
      console.log('looping')
        for(let lpIndex in lastProducts) {
          console.log('LP', lastProducts[lpIndex])
          let present = false
          for(let pIndex in products) {
            console.log('P', products[pIndex])
            if(lastProducts[lpIndex].id == products[pIndex].id) {
              present = true
              break;
            }
          }
          console.log(lastProducts[lpIndex], 'present?: ', present)
        }
      // }
    })
}