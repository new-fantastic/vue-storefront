import axios from 'axios'
import config from 'config'

export const actions = {
  async loadContent ({commit}, {slug, lang}) {
    const baseUrl = `${config.wordpressCms.url}/${lang}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/pages?slug=${slug}`)
      commit('setContent', response.data)
      
    } catch (err) {

      console.log(err)
    }
  },

  async loadTopNav ({commit}, {lang}) {
    const baseNav = `${config.wordpressCms.url}/${lang}/wp-json/menus/v1/locations/header`
    try {
      const response = await axios.get(baseNav)
      commit('setTopNav', response.data)
    } catch (err) {
      console.log(err)
    }
  },

  // async loadBottomNav ({commit}, {lang}) {
  //   const baseNav = `${config.wordpressCms.url}/wp-json/menus/v1/locations/footer`
  //   try {
  //     const response = await axios.get(baseNav)
  //     commit('setBottomNav', response.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },

  async loadTopAlert ({commit}, {lang}) {
    const baseUrl = `${config.wordpressCms.url}/${lang}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/alerts/117`)
      commit('setTopAlert', response.data.acf.TopAlert)
    } catch (err) {
      console.log(err)
    }
  },

  async loadBottomMenu ({commit}, {lang}) {
    const baseUrl = `${config.wordpressCms.url}/${lang}/wp-json/menus/v1/menus`
  
    try {
      const response = await Promise.all([
        axios.get(`${baseUrl}/stopka-o-nas`),
        axios.get(`${baseUrl}/stopka-pomoc`)
      ])


      commit('setBottomMenu', response.map(v => {
        // https://wordpress.kubotastore.pl/historia-marki/ -> /info/historia-marki/
        const items = v.data.items.map(item => ({
          ...item,
          url: item.url.replace(config.wordpressCms.url, '/info')
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
