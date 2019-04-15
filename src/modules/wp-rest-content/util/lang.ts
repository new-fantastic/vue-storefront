import config from 'config'
import { Route } from 'vue-router'
import rootStore from '@vue-storefront/store'

export const getLangByRoute = (route: Route): string => {
    return config.storeViews.mapStoreUrlsFor.some(
        el => route.name.includes(`${el}-`)) ? 'en' : 'pl'
}

export const getLangByStoreviewUrl = (): string => {
    return rootStore.state.storeView.url &&
      rootStore.state.storeView.url.substr(1) !== "pln"
        ? "en"
        : "pl";
}