import axios from 'axios'
import config from 'config'

export const actions = {
  async loadContent ({commit}, {pageId, lang}) {
    const baseUrl = `${config.wordpressCms.url}/${lang}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/pages/${pageId}`)
      commit('setContent', response.data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadTopNav ({commit}) {
    const baseNav = `${config.wordpressCms.url}/wp-json/menus/v1/locations/header`
    try {
      const response = await axios.get(baseNav)
      commit('setTopNav', response.data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadBottomNav ({commit}) {
    const baseNav = `${config.wordpressCms.url}/wp-json/menus/v1/locations/footer`
    try {
      const response = await axios.get(baseNav)
      commit('setBottomNav', response.data)
    } catch (err) {
      console.log(err)
    }
  },

  async loadTopAlert ({commit}) {
    const baseUrl = `${config.wordpressCms.url}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/alerts`)
      commit('setTopAlert', response.data)
    } catch (err) {
      console.log(err)
    }
  }
}
