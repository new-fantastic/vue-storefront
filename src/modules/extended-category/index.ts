import mutations from "./mutations";
import actions from "./actions";
// import { extendModule } from '@vue-storefront/core/lib/module';

const extendCategoryVuex = {
  mutations,
  actions,
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
    childCategories: [],
    sort_order: []
  }
};

export const categoryExtend = {
  key: "catalog",
  store: { modules: [{ key: "category", module: extendCategoryVuex }] }
};

//  extendModule(productExtend)
