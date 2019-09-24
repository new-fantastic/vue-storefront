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
import { Url } from "@vue-storefront/core/modules/url";
import { Homepage } from "./homepage";
import { Claims } from "./claims";
import { Ui } from "./ui-store";
// import { GoogleAnalytics } from './google-analytics';
// import { Hotjar } from './hotjar';
// import { AmpRenderer } from './amp-renderer';
import { PaymentBackendMethods } from "./payment-backend-methods";
import { PaymentCashOnDelivery } from "./payment-cash-on-delivery";
import { InstantCheckout } from "./instant-checkout";
import { WpJson } from "./vsf-wp-json";
import { FacebookPixel } from "./vsf-facebook-pixel";
import { VsfGoogleTagManager } from "./vsf-google-tag-manager";
import { VsfFacebookJsSdk } from "./vsf-facebook-js-sdk";
import { MessengerChat } from "./vsf-messenger-chat";

import {
  extendMappingFallback,
  Payload
} from "src/modules/vsf-mapping-fallback";
import {
  forProduct,
  forCategory,
  tap
} from "src/modules/vsf-mapping-fallback/builtin";

import { productExtend } from "./extended-product";
import { categoryExtend } from "./extended-category";
import { cartExtend } from "./extended-cart";

import { FeaturedProducts } from "./featured-products";
import { CustomPricingRules } from "./custom-pricing-rules";
import { removeStoreCodeFromRoute, currentStoreView } from "@vue-storefront/core/lib/multistore";

import Vue from 'vue'
import store from '@vue-storefront/core/store'

export const forStaticPage = async (context, { url, params }: Payload) => {
  url = removeStoreCodeFromRoute(url) as string;
  const { storeCode } = currentStoreView();
  Vue.prototype.$wp.requestPrefix = storeCode;
  const slug = url.split('/').reverse()[0]

  await store.dispatch("wp_post/load", {
    embed: true,
    dataName: 'fetchedData',
    slug
  });

  if (store.state[`wp_post`].types.pages[slug]) {
    return {
      name: "static-page",
      params: {
        slug: url
      }
    };
  }
};

extendMappingFallback(forProduct, forCategory, forStaticPage, tap);

extendModule(productExtend);
extendModule(categoryExtend);
extendModule(cartExtend);

/**
 * Some of the modules are registered lazily only when components from the module are appearing on current page.
 * If you want to use this module in pages without its components you need to remember about registering module first
 * In VS 1.8 this modules will be seamlessly lazyLoaded after proper action dispatch
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
  // GoogleAnalytics,
  // Hotjar,
  PaymentBackendMethods,
  PaymentCashOnDelivery,
  // AmpRenderer,
  InstantCheckout,
  Url,
  WpJson,
  FacebookPixel,
  VsfGoogleTagManager,
  VsfFacebookJsSdk,
  MessengerChat,
  FeaturedProducts,
  CustomPricingRules
  // Example
];
