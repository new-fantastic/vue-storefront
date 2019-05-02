import axios from 'axios'
import { WPRState } from '../types/WPRState'
import { ActionTree } from 'vuex';
import config from 'config'

import * as types from './mutation-types'

export const actions = {
  async loadContent ({state, commit}, {slug, lang}) {
    // const lang = state.lang
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/pages?slug=${slug}`)

      if(response.data.status == 404) {
        throw new Error('Endpoint ain\'t ready')
      }
    
      commit(types.SET_CONTENT, {
        data: response.data,
        slotName: slug
      })
  
      return response.data
    } catch (err) {}
  },

  async loadTopNav ({state, commit}) {
    const lang = state.lang
    const part = lang == 'pl' ? '' : '/' + lang
    const baseNav = `${config.wordpressCms.url}${part}/wp-json/menus/v1/locations/header`.replace('//', '/')
    try {
      const { data } = await axios.get(baseNav)

      if(data.status == 404) {
        throw new Error('Endpoint ain\'t ready')
      }

      data.items = data.items.map(v => ({ 
        ...v, 
        url: v.url.replace('en/', '') 
      }))

      commit(types.SET_TOP_NAV, data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadTopAlert ({state, commit}) {
    const lang = state.lang
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/alerts/117`)

      if(response.data.status == 404) {
        throw new Error('Endpoint ain\'t ready')
      }
     
      // commit(types.SET_TOP_ALERT, response.data.acf.TopAlert)
    } catch (err) {
      console.log(err)
    }
  },

  async loadBottomMenu ({state, commit}) {
    const lang = state.lang
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/menus/v1/menus`
  
    try {
      const response = await Promise.all([
        axios.get(`${baseUrl}/stopka-o-nas`),
        axios.get(`${baseUrl}/stopka-pomoc`)
      ])

      if(response[0].data.status == 404 || response[1].data.status == 404) {
        throw new Error('Endpoint ain\'t ready')
      }


      const pagePrefix = config.wordpressCms.staticPagePrefix 
        ? config.wordpressCms.staticPagePrefix 
        : 'info'

      commit(types.SET_BOTTOM_MENU, response.map(v => {
        // https://wordpress.kubotastore.pl/historia-marki/ -> /info/historia-marki/
        const items = v.data.items.map(item => ({
          ...item,
          url: item.url.replace(config.wordpressCms.url + '/' + lang + '/', `/${pagePrefix}/`).replace(config.wordpressCms.url, `/${pagePrefix}`)
        }))
        return {
          ...v.data,
          items
        }
      }).sort((a, b) => { 
        if (a.term_id < b.term_id) return -1
        else if (a.term_id > b.term_id) return 1
        else return 0
      }))
    } catch (err) {
      console.log('ERR', err)
    }
  }

}
