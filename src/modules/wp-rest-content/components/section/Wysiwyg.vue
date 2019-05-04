<template>
  <div
    v-if="data"
    class="section-wp visual-editor"
  >
    <div class="container" v-html="data.wp_wysiwyg_editor" />
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

<style lang="scss">

// @import '~theme/css/kubota/base/typography';

.section-wp.visual-editor {
  h1 {
    // @extend .heading-lg;
  }
  h2 {
    // @extend .heading-md;
    margin: 3rem 0;
  }
  h3 {
    // @extend .heading-sm;
    margin: 2rem 0;
  }
  p {
    margin: 1rem 0;
  }

  ul, ol {
    list-style: initial;
    list-style-position: inside;
    margin-left: 2rem;

    li {
      margin-bottom: 1rem;
    }
  }

  ol {
    list-style-type: decimal;
  }

  strong {
    font-weight: bold;
  }
}

</style>
