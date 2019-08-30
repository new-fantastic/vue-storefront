import { AsyncDataLoader } from "@vue-storefront/core/lib/async-data-loader";

export async function afterRegistration({ Vue, config, store, isServer }) {
  AsyncDataLoader.push({
    // this is an example showing how to call data loader from another module
    execute: async ({ route, store, context }) => {
      await store.dispatch("custom-pricing-rules/loadRules");
    }
  });
}
