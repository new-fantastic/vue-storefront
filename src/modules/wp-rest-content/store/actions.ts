import axios from 'axios'
import config from 'config'
import { ContentState } from '../types/ContentState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'

interface DynamiclyNamedFragment {
  slug: string
  lang: string
}

interface StaticlyNamedFragment {
  lang: string
}

export const actions: ActionTree<ContentState, DynamiclyNamedFragment | StaticlyNamedFragment> = {

  async loadContent ({commit}, {slug, lang}: DynamiclyNamedFragment) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/pages?slug=${slug}`)
    
      commit(types.SET_CONTENT, {
        data: response.data,
        slotName: slug
      })
      return response.data
    } catch (err) {}
  },

  async loadTopNav ({commit}, {lang}: StaticlyNamedFragment) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseNav = `${config.wordpressCms.url}${part}/wp-json/menus/v1/locations/header`
    try {
      const { data } = await axios.get(baseNav)

      data.items = data.items.map(v => ({ 
        ...v, 
        url: v.url.replace('en/', '') 
      }))

      commit(types.SET_TOP_NAV, data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadTopAlert ({commit}, {lang}: StaticlyNamedFragment) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/alerts/117`)
     
      commit(types.SET_TOP_ALERT, response.data.acf.TopAlert)
    } catch (err) {
      console.log(err)
    }
  },

  async loadBottomMenu ({commit}, {lang}: StaticlyNamedFragment) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/menus/v1/menus`
  
    try {
      const response = await Promise.all([
        axios.get(`${baseUrl}/stopka-o-nas`),
        axios.get(`${baseUrl}/stopka-pomoc`)
      ])


      commit(types.SET_BOTTOM_MENU, response.map(v => {
        // https://wordpress.kubotastore.pl/historia-marki/ -> /info/historia-marki/
        const items = v.data.items.map(item => ({
          ...item,
          url: item.url.replace(config.wordpressCms.url + '/' + lang + '/', '/info/').replace(config.wordpressCms.url, '/info')
        }))
        return {
          ...v.data,
          items
        }
      }).sort((a, b) => {
        return Number(a.term_id > b.term_id) // 'Pomoc' then 'O nas'
      }))
    } catch (err) {
      console.log('ERR', err)
    }
  }

}
