import { VueAnalytics } from '../types/VueAnalytics';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

/*
*   @param (ga) windowGa
*   @param (Vue.prototype.$ga.ecommerce) ga
*   @param ([]any) args
*/

export default function (windowGa: any, ga: VueAnalytics, ...args: any): void {
  windowGa('send', ...args)

  const storeCode = currentStoreView()
  ga.set('currencyCode', storeCode.i18n.currencyCode)
}