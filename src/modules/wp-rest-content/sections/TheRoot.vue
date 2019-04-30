<template>
  <div>
    <div v-if="data && data.acf && data.acf.section">
      <div
        v-if="!renderSingle"
      >
        <component
          v-for="(section, index) in data.acf.section"
          :key="`${section.acf_fc_layout}-${index}`"
          :is="`Sections${section.acf_fc_layout}`"
          :data="section"
        />
      </div>

      <component
        v-else
        :is="`Sections${renderSingle}`"
        :data="data.acf.section.find(e => e.acf_fc_layout === renderSingle)"
      />
    </div>
  </div>
</template>

<script>

export default {
  components: {
    SectionsBannerFullwidth: () => import('./SectionsBannerFullwidth.vue'),
    // SectionsTwoCols: () => import('./SectionsTwoCols.vue'),
    // SectionsThreeCols: () => import('./SectionsThreeCols.vue'),
    // SectionsImageWithText: () => import('./SectionsImageWithText.vue'),
    // SectionsImageWithTextOverlay: () => import('./SectionsImageWithTextOverlay.vue'),
    // SectionsInstagram: () => import('./SectionsInstagram.vue'),
    // SectionsCategoryUpsell: () => import('./SectionsCategoryUpsell.vue'),
    // SectionsVisualEditor: () => import('./SectionsVisualEditor.vue'),
    SectionsWysiwyg: () => import('./SectionsWysiwyg.vue')
  },
  props: {
    renderSingle: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: null
    }
  }
}
</script>
