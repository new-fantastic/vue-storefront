// import { module } from './store'
// import { mediaModule } from './store/media'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { preparedRoutes } from './router/routes'
import { ModulePrefix } from '@vue-wordpress/core'

import { config } from '@vue-wordpress/core/store/config'
import { lang } from '@vue-wordpress/core/store/lang'
import { layouts } from '@vue-wordpress/core/store/layouts'
import { media } from '@vue-wordpress/core/store/media'
import { menu } from '@vue-wordpress/core/store/menu'
import { meta } from '@vue-wordpress/core/store/meta'
import { page } from '@vue-wordpress/core/store/page'
import { post } from '@vue-wordpress/core/store/post'
import cfg from 'config'

export const KEY = 'wp_rest_content'
// export const MEDIA_KEY = 'wpr_media'

let router: any = {
  routes: <any>preparedRoutes
}
if ('router' in cfg.wordpressCms) {
  if (cfg.wordpressCms.router === false) {
    router = {}
  }
}

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  router: { 
    ...router
  },
  store: { modules: [
    { key: `${ModulePrefix}_config`, module: config },
    { key: `${ModulePrefix}_lang`, module: lang },
    { key: `${ModulePrefix}_layouts`, module: layouts },
    { key: `${ModulePrefix}_media`, module: media },
    { key: `${ModulePrefix}_menu`, module: menu },
    { key: `${ModulePrefix}_meta`, module: meta },
    { key: `${ModulePrefix}_page`, module: page },
    { key: `${ModulePrefix}_post`, module: post },

  ] },
}

export const WpJson = new VueStorefrontModule(moduleConfig)
