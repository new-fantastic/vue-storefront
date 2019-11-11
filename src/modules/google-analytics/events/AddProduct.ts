import rootStore from '@vue-storefront/core/store';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { VueAnalytics, EeProductData } from '../types/VueAnalytics'

export default (ecommerce: VueAnalytics, productData: EeProductData, action: string = 'detail'): void => {
  const productDataWithBrand = {
    ...productData,
    ...(productData.brand ? { brand: productData.brand } : { brand: rootStore.state.config.analytics.defaultBrand })
  }
  ecommerce.addProduct(productDataWithBrand)
  ecommerce.setAction(action)
  EventBus.$emit('ga-add-product', { product: productDataWithBrand })
}