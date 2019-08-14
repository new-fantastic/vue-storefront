import getters from './getters'
// import { extendModule } from '@vue-storefront/core/lib/module';

const extendProductVuex = {
  getters
 }

 export const productExtend = {
  key: 'catalog',
  store: { modules: [{ key: 'product', module: extendProductVuex }] },
 }

//  extendModule(productExtend)