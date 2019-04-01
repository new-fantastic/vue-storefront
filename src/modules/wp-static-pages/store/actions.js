import axios from 'axios'
import config from 'config'

export const actions = {
  async loadContent({commit}, {pageId, lang}) {
    
    const baseUrl = lang !== undefined 
      ? `${config.wordpressCms.url}/${lang}/wp-json/wp/v2`
      : `${config.wordpressCms.url}/wp-json/wp/v2`

    try {
      const response = await axios.get(`${baseUrl}/pages/${pageId}`)
      commit('setContent', response.data)

    } catch(err) {
      console.log(err)
    }
  }
}