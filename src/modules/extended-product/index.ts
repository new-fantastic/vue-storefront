import getters from './getters'
import actions from './actions'
// import { extendModule } from '@vue-storefront/core/lib/module';

const extendProductVuex = {
  getters,
  actions
 }

 export const productExtend = {
  key: 'catalog',
  store: { modules: [{ key: 'product', module: extendProductVuex }] },
 }

//  extendModule(productExtend)