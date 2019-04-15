<template>
  <div class="staticpage page__wrapper container" :key="wpData.id">
    <breadcrumbs :routes="breadcrumbs.routes" :active-route="wpData.title.rendered" />
    <div class="staticpage__heading">
      <h1 class="staticpage__title" v-html="wpData.title.rendered"/>
    </div>
    <Sections v-if="wpData" :data="wpData"/>
    <p v-else>{{ $t('Not found') }}</p>
  </div>
</template>

<script>
import Sections from "theme/components/theme/blocks/Sections/Sections";
import rootStore from "@vue-storefront/store";
import config from 'config'
import { getLangByStoreviewUrl } from '../util/lang.ts'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'

export default {
  components: {
    Sections,
    Breadcrumbs
  },

  computed: {
    categories() {
      return this.getCategories;
    },
    wpData () {
      const lang = rootStore.state.storeView.url && rootStore.state.storeView.url.substr(1) !== 'pln' ? 'en' : 'pl'
      const langComponentName = (this.$route.name).replace(`${lang !== 'pl' ? rootStore.state.storeView.url.substr(1) + '-' : ''}`, '')
    
      return this.$store.state.wp_rest_content.contentSlots[this.$route.params.slug]
    },
    breadcrumbs() {
      return {
        routes: [
          { name: 'Home', route_link: '/' }
        ]
      }
    }
  },
  metaInfo() {
    // const headWpData = this.wpData()
    return {
      title: this.wpData.title.rendered,
      meta: [
        {
          name: "description",
          vmid: "description",
          content: this.wpData.acf.meta_description
        }
      ]
    };
  },
  watch: {
    async $route(to) {
      const lang = getLangByStoreviewUrl()

      await this.$store.dispatch("wp_rest_content/loadContent", {
        slug: to.params.slug,
        lang: lang
      });
    }
  },
  async asyncData({ store, route }) {
    const lang = getLangByStoreviewUrl()

    await store.dispatch("wp_rest_content/loadContent", {
      slug: route.params.slug,
      lang: lang
    });

    const config = store.state.config;

    await store.dispatch("category/list", {
      includeFields: config.entities.optimize
        ? config.entities.category.includeFields
        : null
    });
  }
};
</script>

<style lang="scss">
@import "~theme/css/kubota/base/typography";
@import "~theme/css/kubota/base/animations";

.staticpage {
  .section-wp {
    margin: 5rem auto;
    @media all and (max-width: 980px) {
      margin: 3rem auto;
    }
  }
}

.staticpage__heading {
  padding: 3rem 0;

  .staticpage__title {
    @extend .heading-md;
    text-align: center;
  }
}

.section-wp {
  margin: 5rem auto;
  @media all and (max-width: 980px) {
    margin: 3rem auto;
  }
}
</style>
