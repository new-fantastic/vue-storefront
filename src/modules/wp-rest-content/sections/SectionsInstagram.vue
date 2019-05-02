<template>
  <div
    v-if="data"
    class="section-wp instagram"
  >
    <h2 class="instagram__title">Instagram section</h2>
    <p>{{ data.Instagram_tag }}</p>
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
  // styles to refactor!
  .instagram {
    width: 100%;
    height: 400px;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;

    &__title {
      font-size: 60px;
      color: black;
    }
  }
</style>
