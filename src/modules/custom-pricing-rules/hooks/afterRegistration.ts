export async function afterRegistration({ Vue, config, store, isServer }) {
  await store.dispatch("custom-pricing-rules/loadRules");
}
