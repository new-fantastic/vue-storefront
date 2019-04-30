import config from 'config'
import rootStore from '@vue-storefront/store'

export default {
  computed: {
    wpData () {
      const lang = rootStore.state.storeView.url && rootStore.state.storeView.url.substr(1) !== 'pln' ? 'en' : 'pl'
      const langComponentName = (this.$route.name).replace(`${lang !== 'pl' ? rootStore.state.storeView.url.substr(1) + '-' : ''}`, '')

      return this.$store.state.wp_rest_content.contentSlots[config.wordpressCms.pages[langComponentName]]
    }
  },
  async asyncData ({ store, route }) {
    const lang = rootStore.state.storeView.url && rootStore.state.storeView.url.substr(1) !== 'pln' ? 'en' : 'pl'
    const langComponentName = (route.name).replace(`${lang !== 'pl' ? rootStore.state.storeView.url.substr(1) + '-' : ''}`, '')
    if (
      config.wordpressCms.pages[route.name] ||
      config.wordpressCms.pages[langComponentName]
    ) {
      /*let wp = */await store.dispatch('wp_rest_content/loadContent', {
        slug: config.wordpressCms.pages[langComponentName],
        lang: lang
      })

    //   if (wp) {
    //     let upsellObj = wp[0].acf.section.find((e) => {
    //       return e.acf_fc_layout === 'CategoryUpsell'
    //     })

    //     if (upsellObj) {
    //       await store.dispatch('category_upsell/getUpsell', { id: upsellObj.CategoryUpsell_id })
    //     }
    //   }
    }
  }
}
