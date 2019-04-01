<template>
  <div class="wordpress-static-page" :key="pageName">
    <component :is="layout" :content="wpData"/>
  </div>
</template>

<script>
// import wpFetch from 'theme/mixins/wpFetch'
// import axios from 'axios'
// import config from 'config'
import rootStore from '@vue-storefront/store'

const pages = {
  // page_url for example 'about' and id in api
  about: 11,
  campaigns: 77,
  contact: 26,
  delivery: 20,
  faq: 18,
  'privacy-policy': 16,
  returns: 22,
  stockists: 14,
  'terms-and-conditions': 24
}

const layouts = {
  campaigns: 'Tile',
  home: 'Tile'
}

export default {
  computed: {
    wpData () {
      return this.$store.state.wp_rest_content.content
    },
    pageName () {
      return this.$route.params.pageName
    }
  },
  watch: {
    '$route' (to) {
      const pageId = pages[to.params.pageName]
      this.updateContent(pageId)
    }
  },
  beforeRouteEnter (to, from, next) {
    // If page doesn't exist -> redirect to /
    if (to.params.pageName in pages) {
      next()
    } else {
      next('/')
    }
  },
  methods: {
    async updateContent (pageId) {
      const lang = rootStore.state.storeView.url && rootStore.state.storeView.url.substr(1) !== 'pln' ? 'en' : 'pl'

      await this.$store.dispatch('wp_rest_content/loadContent', {
        pageId,
        lang
      })

      // Setting layout
      if (this.$route.params.pageName in layouts) {
        this.$store.commit('wp_rest_content/setLayout', layouts[this.$route.params.pageName])
      } else {
        this.$store.commit('wp_rest_content/setLayout', 'Base')
      }
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    const config = store.state.config
    await store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null })

    const pageId = pages[route.params.pageName] // Guard makes it safe
    const lang = rootStore.state.storeView.url && rootStore.state.storeView.url.substr(1) !== 'pln' ? 'en' : 'pl'

    // Setting layout
    if (route.params.pageName in layouts) {
      store.commit('wp_rest_content/setLayout', layouts[route.params.pageName])
    } else {
      store.commit('wp_rest_content/setLayout', 'Base')
    }

    await store.dispatch('wp_rest_content/loadContent', {
      pageId,
      lang
    })
  }
}
</script>
