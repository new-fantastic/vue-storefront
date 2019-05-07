import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from '@vue-storefront/core/modules/catalog/store/category/mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { entityKeyName } from '@vue-storefront/store/lib/entities'
import rootStore from '@vue-storefront/store'
import i18n from '@vue-storefront/i18n'
import chunk from 'lodash-es/chunk'
import trim from 'lodash-es/trim'
import toString from 'lodash-es/toString'
import { optionLabel } from '@vue-storefront/core/modules/catalog/helpers/optionLabel'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog/types/CategoryState'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { Logger } from '@vue-storefront/core/lib/logger'
import { router } from '@vue-storefront/core/app';

const PRODUCT_REENTER_TIMEOUT = 20000

export const catalogExtend = {
 key: 'catalog',
 store: { modules: [{ key: 'category', module: {
   actions: {
     list(context, { parent = null, key = null, value = null, level = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = rootStore.state.config.entities.optimize ? rootStore.state.config.entities.category.includeFields : null, excludeFields = rootStore.state.config.entities.optimize ? rootStore.state.config.entities.category.excludeFields : null, skipCache = false }) {
      const commit = context.commit

      let customizedQuery = false // that means the parameteres are != defaults; with defaults parameter the data could be get from window.__INITIAL_STATE__ - this is optimisation trick
      let searchQuery = new SearchQuery()
      if (parent && typeof parent !== 'undefined') {
        searchQuery = searchQuery.applyFilter({key: 'parent_id', value: {'eq': typeof parent === 'object' ? parent.id : parent }})
        customizedQuery = true
      }
  
      if (level !== null) {
        searchQuery = searchQuery.applyFilter({key: 'level', value: {'eq': level}})
        if (level !== rootStore.state.config.entities.category.categoriesDynamicPrefetchLevel) // if this is the default level we're getting the results from window.__INITIAL_STATE__ not querying the server
        customizedQuery = true
      }
  
      if (key !== null) {
        searchQuery = searchQuery.applyFilter({key: key, value: {'eq': value}})
        customizedQuery = true
      }
  
      if (onlyActive === true) {
        searchQuery = searchQuery.applyFilter({key: 'is_active', value: {'eq': true}})
      }
  
      if (onlyNotEmpty === true) {
        searchQuery = searchQuery.applyFilter({key: 'product_count', value: {'gt': 0}})
        customizedQuery = true
      }
      searchQuery = searchQuery.applyFilter({key: 'include_in_menu', value: {'eq': true}})
      customizedQuery = true
  
      if (skipCache || ((!context.state.list || context.state.list.length === 0) || customizedQuery)) {
      return quickSearchByQuery({ entityType: 'category', query: searchQuery, sort: sort, size: size, start: start, includeFields: includeFields, excludeFields: excludeFields }).then((resp) => {
        commit(types.CATEGORY_UPD_CATEGORIES, Object.assign(resp, { includeFields, excludeFields }))
        Vue.prototype.$bus.$emit('category-after-list', { query: searchQuery, sort: sort, size: size, start: start, list: resp })
        return resp
      })
      } else {
        return new Promise((resolve, reject) => {
          let resp = { items: context.state.list, total: context.state.list.length }
          Vue.prototype.$bus.$emit('category-after-list', { query: searchQuery, sort: sort, size: size, start: start, list: resp })
          resolve(resp)
        })
      }
     }
   }
 } },
 {
   key: 'product',
   module: {
     actions: {
      fetchAsync (context, { parentSku, childSku = null, route = null }) {
        if (context.state.productLoadStart && (Date.now() - context.state.productLoadStart) < PRODUCT_REENTER_TIMEOUT) {
          Logger.log('Product is being fetched ...', 'product')()
        } else {
          
          context.state.productLoadPromise = new Promise((resolve, reject) => {
            context.state.productLoadStart = Date.now()
            Logger.info('Fetching product data asynchronously' , 'product', {parentSku, childSku})()
            Vue.prototype.$bus.$emit('product-before-load', { store: rootStore, route: route })
            context.dispatch('reset').then(() => {
              context.dispatch('fetch', { parentSku: parentSku, childSku: childSku }).then((subpromises) => {
                console.log('NOW', rootStore.getters['product/productCurrent'])

                const cats = rootStore.getters['product/productCurrent'].category
                const blockedCategories = [
                  { id: 9, name: 'VIP' }
                ]

                for(let category of cats) {
                  for(let blockedCategory of blockedCategories) {
                    if(category.category_id == blockedCategory.id && category.name == blockedCategory.name) {
                      router.push('/')
                    }
                  }
                }

                Promise.all(subpromises).then(subresults => {
                  Vue.prototype.$bus.$emitFilter('product-after-load', { store: rootStore, route: route }).then((results) => {
                    context.state.productLoadStart = null
                    // console.log('NOW', rootStore.getters['product/productCurrent'])
                    return resolve()
                  }).catch((err) => {
                    context.state.productLoadStart = null
                    Logger.error(err, 'product')()
                    return resolve()
                  })
                }).catch(errs => {
                  context.state.productLoadStart = null
                  reject(errs)
                })
              }).catch(err => {
                context.state.productLoadStart = null
                reject(err)
              }).catch(err => {
                context.state.productLoadStart = null
                reject(err)
              })
            })
          })
        }
        return context.state.productLoadPromise
      }
     }
   }
 }
] },
}