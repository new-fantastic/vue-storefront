import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'
import WpJson from '@vue-wordpress/core'
import * as vuex from '@vue-wordpress/core/plugin/initializers/store'
// import registerPlugin from '@vue-wordpress/core/plugin/registerPlugin'

export function afterRegistration ({ Vue, store, isServer }) {

  const tmpCfg: any = {
    config: {
      ...config.wordpressCms
    },
    store: true,
    router: true
  }

  if('plugins' in config.wordpressCms) {
    tmpCfg.plugins = config.wordpressCms.plugins
  }

  Vue.use(WpJson, tmpCfg)

  AsyncDataLoader.push({
    execute: async ({ route }) => {

      // HERE WILL BE PRODUCTS

      await vuex.loadBase(store.dispatch, 'menus' in tmpCfg.config ? tmpCfg.config.menus : {}) // menus
      vuex.setLang(store.commit, tmpCfg.config.lang) 
      vuex.setConfig(store.commit, {
        ...tmpCfg.config,
        asyncData: true
      }) 

    }
  })
}
