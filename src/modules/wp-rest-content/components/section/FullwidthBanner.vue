<template>
  <div
    v-if="data"
    :class="{
      'section-wp banner-fw': true,
      'banner-fw--lg': data.BannerFullwidth_height === 'lg',
      'banner-fw--sm': data.BannerFullwidth_height === 'sm',
      'margins-top-bottom' : data.BannerFullwidth_margins === true
    }"
  >
    <div style="height:100%" :class="{container: data.BannerFullwidth_container === 'with_container'}">

      <img
        v-if="data[prefix + 'image_desktop']"
        class="banner-fw__image"
        :src="data[prefix + 'image_desktop'].url "
        :alt="data[prefix + 'image_desktop'].alt"
      >

      <img
        v-if="data[prefix + 'image_mobile']"
        class="banner-fw__image mobile"
        :src="data[prefix + 'image_mobile'].url"
        :alt="data[prefix + 'image_mobile'].alt"
      >

      <div :class="{
        'banner-fw__content-wrap': true,
        'banner-fw__content-wrap--left container': 
          data[prefix + 'layout'][data[prefix + 'text_position_x']] === 'left',
        'banner-fw__content-wrap--center container': 
          data[prefix + 'layout'][data[prefix + 'text_position_x']] === 'center',
        'banner-fw__content-wrap--right container': 
          data[prefix + 'layout'][data[prefix + 'text_position_x']] === 'right'
      }"
      >
        <div class="banner-fw__content">
          <h2 class="banner-fw__content__title"
            v-html="data[prefix + 'title']"
            v-if="data[prefix + 'title']"
          />

          <div
            class="banner-fw__content__description"
            v-if="data[prefix + 'description']"
            v-html="data[prefix + 'description']"
          />

          <BaseButton
            v-if="data[prefix + 'button']"
            class="banner-fw__content__btn"
            :class="{ 
              'light' : data[prefix + 'button'][prefix + 'button_color'] === 'light',
              'dark' : data[prefix + 'button'][prefix + 'button_color'] === 'dark'
            }"
            :size="data[prefix + 'button'][prefix + 'button_size']"
            :link="data[prefix + 'button'][prefix + 'button_link']"
            :externalLink="externalLink"
          >
            {{ data[prefix + 'button'][prefix + 'button_text'] }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IsLinkExternal from '../../util/IsLinkExternal'

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      prefix: 'wp_fullwidth_banner_'
    }
  },
  components: {
    BaseButton: () => import('../other/Button.vue')
  },
  computed: {
    externalLink () {
      return IsLinkExternal(this.data[this.prefix + 'button'][this.prefix + 'button_link'])
    }
  }
}
</script>

<style lang="scss">
  // @import '~theme/css/kubota/base/variables';
  // @import '~theme/css/kubota/base/typography';

  .section-wp {
    margin: 5rem auto;
    min-height: 400px;
  }

  .banner-fw {
    width: 100%;
    position: relative;
    margin: 0 auto !important;

    &.margins-top-bottom {
      margin: 5rem auto !important;
      @media all and (max-width: 980px) {
        margin: 3rem auto !important;
      }
    }

    .container {
      height: 100%;

      .banner-fw__content {
        
        &-wrap {

          &.container {
            padding: 10rem;
            @media all and (max-width: 980px) {
              padding: 3rem;
              width: 100%;
            }
          }
        }
      }
    }

    &--lg {
      height: 930px;
    }

    &--sm {
      height: 750px;
    }

    &__image {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
      display: none;

      @media all and (min-width: 980px) {
        display: block;
        &.mobile {
          display: none;
        }
      }
    }

    &__content-wrap {
      position: absolute;
      display: flex;
      align-items: center;
      // width: 100%;
      height: 100%;
      z-index: 2;
      // color: $color-white;
      color: #fff;
      left: 50%;
      transform: translate(-50%);

      &--left {
        justify-content: flex-start;

        .banner-fw__content {
          align-items: flex-start;
          text-align: left;
        }
      }

      &--center {
        justify-content: center;

        .banner-fw__content {
          align-items: center;
          text-align: center;
        }
      }

      &--right {
        justify-content: flex-end;

        .banner-fw__content {
          align-items: flex-end;
          text-align: right;
        }
      }
    }

    &__content {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;

      &__title {
        // @extend .heading-lg;
        font-size: 3rem;
        font-weight: 700;
        max-width: 24rem;
        padding-bottom: 9px;
        @media all and (max-width: 767px) {
          text-align: center !important;
          align-self: center !important;
          justify-self: center !important;
        }
      }

      &__description {
        margin: 1rem 0;
        p {
          // @extend .paragraph-md;
          font-size: 1.2rem;
        }

        ul, ol {
          margin: 1rem 0;
          padding-left: 2rem;
          list-style: initial !important;

          li {
            list-style: initial !important;
            padding-left: 2rem;
            margin-bottom: .6rem;
          }
        }
      }

      &__btn {
        display: block;
        margin-top: 22px;
      }
    }
  }
</style>
