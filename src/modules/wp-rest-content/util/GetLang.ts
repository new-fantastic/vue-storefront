import config from 'config'
import { Route } from 'vue-router'

export const getLangByRoute = (route: Route): string => {
    return config.storeViews.mapStoreUrlsFor.some(
            el => route.name.includes(`${el}-`)
        ) ? 'en' : 'pl'
}