import { extendModule } from "@vue-storefront/core/lib/module";
import { VueStorefrontModule } from "@vue-storefront/core/lib/module";
import { Catalog } from "@vue-storefront/core/modules/catalog";
import { Cart } from "@vue-storefront/core/modules/cart";
import { Checkout } from "@vue-storefront/core/modules/checkout";
import { Compare } from "@vue-storefront/core/modules/compare";
import { Review } from "@vue-storefront/core/modules/review";
import { Mailer } from "@vue-storefront/core/modules/mailer";
import { Wishlist } from "@vue-storefront/core/modules/wishlist";
import { Mailchimp } from "../modules/mailchimp";
import { Notification } from "@vue-storefront/core/modules/notification";
import { RecentlyViewed } from "@vue-storefront/core/modules/recently-viewed";
import { Homepage } from "./homepage";
import { Claims } from "./claims";
import { PromotedOffers } from "./promoted-offers";
import { Ui } from "./ui-store";
import { GoogleAnalytics } from "./google-analytics";
import { Hotjar } from "./hotjar";
import { AmpRenderer } from "./amp-renderer";
import { PaymentBackendMethods } from "./payment-backend-methods";
import { PaymentCashOnDelivery } from "./payment-cash-on-delivery";
import { RawOutputExample } from "./raw-output-example";
import { Magento2CMS } from "./magento-2-cms";
import { WPRestContent } from "./wp-rest-content";
import { CategoryUpsell } from "./category-upsell";

import { VsfFacebookPixel } from "./vsf-facebook-pixel";
import { VsfGoogleTagManager } from "./vsf-google-tag-manager";

import { Bundle, extendedCart } from "./bundle";
import Vue from "vue";

// import { Example } from './module-template'

// This is how you can extend any of VS modues
// const extendCartVuex = {
//   actions: {
//     load () {
//       Logger.info('New load function')()
//     }
//   }
//  }

//  const cartExtend = {
//   key: 'cart',
//   afterRegistration: function(isServer, config) {
//     Logger.info('New afterRegistration hook')()
//   },
//   store: { modules: [{ key: 'cart', module: extendCartVuex }] },
//  }
import { quickSearchByQuery, isOnline } from '@vue-storefront/core/lib/search'
import rootStore from '@vue-storefront/store'
import * as types from '@vue-storefront/core/modules/catalog/store/product/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger';
import { entityKeyName } from '@vue-storefront/store/lib/entities'
import { configureProductAsync, calculateTaxes } from '@vue-storefront/core/modules/catalog/helpers'

extendModule(extendedCart);
extendModule({
  key: "catalog",
  store: {
    modules: [
      {
        key: "product",
        module: {
          actions: {
            configureBundleAsync(context, product) {
              if (product.hasOwnProperty("runNow") && product.runNow === true) {
                return context
                  .dispatch("setupAssociated", {
                    product: product,
                    skipCache: true
                  })
                  .then(() => {
                    context.dispatch("setCurrent", product);
                  })
                  .then(() => {
                    Vue.prototype.$bus.$emit("product-after-setup-associated");
                  });
              }
              return Promise.resolve();
            },
            /**
             * Search ElasticSearch catalog of products using simple text query
             * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
             * @param {Object} query is the object of searchQuery class
             * @param {Int} start start index
             * @param {Int} size page size
             * @return {Promise}
             */
            list(
              context,
              {
                query,
                start = 0,
                size = 50,
                entityType = "product",
                sort = "",
                cacheByKey = "sku",
                prefetchGroupProducts = !Vue.prototype.$isServer,
                updateState = false,
                meta = {},
                excludeFields = null,
                includeFields = null,
                configuration = null,
                append = false,
                populateRequestCacheTags = true
              }
            ) {
              let isCacheable =
                includeFields === null && excludeFields === null;
              if (isCacheable) {
                Logger.debug("Entity cache is enabled for productList")();
              } else {
                Logger.debug("Entity cache is disabled for productList")();
              }

              if (rootStore.state.config.entities.optimize) {
                if (excludeFields === null) {
                  // if not set explicitly we do optimize the amount of data by using some default field list; this is cacheable
                  excludeFields =
                    rootStore.state.config.entities.product.excludeFields;
                }
                if (includeFields === null) {
                  // if not set explicitly we do optimize the amount of data by using some default field list; this is cacheable
                  includeFields =
                    rootStore.state.config.entities.product.includeFields;
                }
              }
              return quickSearchByQuery({
                query,
                start,
                size,
                entityType,
                sort,
                excludeFields,
                includeFields
              }).then(resp => {
                if (resp.items && resp.items.length) {
                  // preconfigure products; eg: after filters
                  for (let product of resp.items) {
                    if (
                      populateRequestCacheTags &&
                      Vue.prototype.$ssrRequestContext
                    ) {
                      Vue.prototype.$ssrRequestContext.output.cacheTags.add(
                        `P${product.id}`
                      );
                    }
                    product.errors = {}; // this is an object to store validation result for custom options and others
                    product.info = {};
                    if (!product.parentSku) {
                      product.parentSku = product.sku;
                    }
                    if (
                      rootStore.state.config.products
                        .setFirstVarianAsDefaultInURL &&
                      product.hasOwnProperty("configurable_children") &&
                      product.configurable_children.length > 0
                    ) {
                      product.sku = product.configurable_children[0].sku;
                    }
                    if (configuration) {
                      let selectedVariant = configureProductAsync(context, {
                        product: product,
                        configuration: configuration,
                        selectDefaultVariant: false
                      });
                      Object.assign(product, selectedVariant);
                    }
                  }
                }
                return calculateTaxes(resp.items, context).then(
                  updatedProducts => {
                    // handle cache
                    const cache = Vue.prototype.$db.elasticCacheCollection;
                    for (let prod of resp.items) {
                      // we store each product separately in cache to have offline access to products/single method
                      if (prod.configurable_children) {
                        for (let configurableChild of prod.configurable_children) {
                          if (configurableChild.custom_attributes) {
                            for (let opt of configurableChild.custom_attributes) {
                              configurableChild[opt.attribute_code] = opt.value;
                            }
                          }
                        }
                      }
                      if (!prod[cacheByKey]) {
                        cacheByKey = "id";
                      }
                      const cacheKey = entityKeyName(
                        cacheByKey,
                        prod[cacheByKey]
                      );
                      if (isCacheable) {
                        // store cache only for full loads
                        cache.setItem(cacheKey, prod).catch(err => {
                          Logger.error(
                            "Cannot store cache for " + cacheKey,
                            err
                          )();
                        });
                      }
                      if (
                        prod.type_id === "grouped" &&
                        prefetchGroupProducts &&
                        !Vue.prototype.$isServer
                      ) {
                        context.dispatch("setupAssociated", { product: prod });
                      }
                    }
                    // commit update products list mutation
                    if (updateState) {
                      context.commit(types.CATALOG_UPD_PRODUCTS, {
                        products: resp,
                        append: append
                      });
                    }
                    Vue.prototype.$bus.$emit("product-after-list", {
                      query: query,
                      start: start,
                      size: size,
                      sort: sort,
                      entityType: entityType,
                      meta: meta,
                      result: resp
                    });
                    return resp;
                  }
                );
              });
            }
          }
        }
      }
    ]
  }
});

/**
 * Some of the modules are registered lazily only when components from module are appearing on current page.
 * If you want to use this modules in pages without it's components you need to remember about registering module first
 * In VS 1.8 this modules will be semlessly lazyLoaded after proper action dispatch
 * - Wishlist
 */
export const registerModules: VueStorefrontModule[] = [
  Checkout,
  Catalog,
  Cart,
  Compare,
  Review,
  Mailer,
  Wishlist,
  Mailchimp,
  Notification,
  Ui,
  RecentlyViewed,
  Homepage,
  Claims,
  PromotedOffers,
  Magento2CMS,
  GoogleAnalytics,
  Hotjar,
  PaymentBackendMethods,
  PaymentCashOnDelivery,
  RawOutputExample,
  AmpRenderer,
  WPRestContent,
  CategoryUpsell,
  VsfFacebookPixel,
  VsfGoogleTagManager,
  Bundle
];
