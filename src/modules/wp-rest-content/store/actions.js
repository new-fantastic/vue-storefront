import axios from 'axios'
import config from 'config'
import https from 'https'

export const actions = {
  async loadContent ({commit}, {slug, lang}) {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    const baseUrl = `${config.wordpressCms.url}/wp-json/wp/v2`
    try {
      const response = await instance.get(`${baseUrl}/pages?slug=${slug}`)
      console.log('res', response.data)
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
