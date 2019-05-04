<template>
  <div 
    v-bind="$attrs"
    :class="{
    'btn': true,
    'btn--sm': size === 'sm',
    'btn--lg': size === 'lg',
    'btn--full': size === 'full',
    'btn--bordered': type === 'bordered'
  }">
    <router-link
      v-if="link !== '' && externalLink === false"
      :to="link"
    >
      <slot />
    </router-link>
    <a
      v-else-if="link !== '' && externalLink === true"
      :href="link"
    >
      <slot />
    </a>
    <div
      v-else
      class="btn__inner"
      @click="emit"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'sm'
    },
    link: {
      type: String,
      default: ''
    },
    externalLink: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    event: {
      type: String,
      default: ''
    }
  },
  methods: {
    emit () {
      this.$bus.$emit(this.event)
    }
  }
}
</script>

<style lang="scss">
//   @import '~theme/css/kubota/base/variables';
//   @import '~theme/css/kubota/base/buttons';

  .btn {
    position: relative;
    // @extend .btn;

    &.dark {
      color: #fff !important;
      background-color: #000;
    }

    &.light {
      color: #000 !important;
      background-color: #fff;
    }

    a, &__inner {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    &--sm {
    //   @extend .btn--sm;
    }

    &--lg {
    //   @extend .btn--lg;
    }

    &--full {
    //   @extend .btn--full;
    }

    &--bordered {
    //   @extend .btn--bordered;
    }
  }
</style>
