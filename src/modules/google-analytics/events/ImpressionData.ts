import rootStore from '@vue-storefront/core/store';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { VueAnalytics, EeImpression } from '../types/VueAnalytics'

export default (ecommerce: VueAnalytics, impressionData: EeImpression): void => {
  const impressionDataWithBrand = {
    ...impressionData,
    ...(impressionData.brand ? { brand: impressionData.brand } : { brand: rootStore.state.config.analytics.defaultBrand })
  }
  ecommerce.addImpression(impressionDataWithBrand)
  EventBus.$emit('ga-add-impression', { impression: impressionDataWithBrand })
}