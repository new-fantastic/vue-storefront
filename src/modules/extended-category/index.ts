import mutations from './mutations'
// import { extendModule } from '@vue-storefront/core/lib/module';

const extendCategoryVuex = {
  mutations,
  state: {
    list: [],
    current: {},
    filters: {
      available: {},
      chosen: {}
    },
    breadcrumbs: {
      routes: []
    },
    current_product_query: null,
    current_path: [],
    childCategories: []
  }
 }

 export const categoryExtend = {
  key: 'catalog',
  store: { modules: [{ key: 'category', module: extendCategoryVuex }] },
 }

//  extendModule(productExtend)