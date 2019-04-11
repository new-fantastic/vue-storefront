import axios from 'axios'
import config from 'config'

export const actions = {
  async loadContent ({commit}, {slug, lang}) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/pages?slug=${slug}`)
      commit('setContent', response.data)
      
    } catch (err) {

      console.log(err)
    }
  },

  async loadTopNav ({commit}, {lang}) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseNav = `${config.wordpressCms.url}${part}/wp-json/menus/v1/locations/header`
    try {
      const { data } = await axios.get(baseNav)

      data.items = data.items.map(v => ({ 
        ...v, 
        url: v.url.replace('en/', '') 
      }))

      commit('setTopNav', data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadTopAlert ({commit}, {lang}) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/alerts`)
      commit('setTopAlert', response.data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadBottomMenu ({commit}, {lang}) {
    const part = lang == 'pl' ? '' : '/' + lang
    const baseUrl = `${config.wordpressCms.url}${part}/wp-json/menus/v1/menus`
  
    try {
      const response = await Promise.all([
        axios.get(`${baseUrl}/stopka-o-nas`),
        axios.get(`${baseUrl}/stopka-pomoc`)
      ])


      commit('setBottomMenu', response.map(v => {
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
        return a.term_id > b.term_id // 'Pomoc' then 'O nas'
      }))
    } catch (err) {
      console.log('ERR', err)
    }
  }

}
