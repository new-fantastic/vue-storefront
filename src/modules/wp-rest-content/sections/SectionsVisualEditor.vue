<template>
  <div
    v-if="data"
    class="section-wp visual-editor"
  >
    <!-- <h2>Visual Editor Section</h2> -->
    <div v-html="data.VisualEditor_content"/>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>
