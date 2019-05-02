<template>
  <div
    v-if="data"
    class="section-wp image-with-text-overlay container"
  >
    <div class="image-with-text-overlay__content-wrap">
      <div class="image-with-text-overlay__content">
        <h3 class="image-with-text-overlay__bgtext"
          :class="{
              'light' : data.text_color === 'Jasny',
              'dark' : data.text_color === 'Ciemny'
            }">
          {{ data.ImageWithTextOverlay_bgtext }}
        </h3>

        <div class="image-with-text-overlay__text">
          <h2 class="image-with-text-overlay__title"
            :class="{
              'light' : data.text_color === 'Jasny',
              'dark' : data.text_color === 'Ciemny'
            }">
            {{ data.ImageWithTextOverlay_title }}
          </h2>

          <div
            v-html="data.ImageWithTextOverlay_description"
            class="image-with-text-overlay__description"
            :class="{
              'light' : data.text_color === 'Jasny',
              'dark' : data.text_color === 'Ciemny'
            }"
          />
        </div>

        <img
          v-if="data.ImageWithTextOverlay_image"
          class="image-with-text-overlay__image"
          :src="data.ImageWithTextOverlay_image.url"
          :alt="data.ImageWithTextOverlay_image.alt"
        >
        <img
          v-if="data.ImageWithTextOverlay_image_mobile"
          class="image-with-text-overlay__image mobile"
          :src="data.ImageWithTextOverlay_image_mobile"
        >
      </div>
    </div>
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
  // @import '~theme/css/kubota/base/variables';
  // @import '~theme/css/kubota/base/typography';

  $img_width: 1080px;

  .image-with-text-overlay {
    // padding: 3rem 6rem;

    &__content {
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &__bgtext {
      position: absolute;
      top: -54px;
      left: 3rem;
      font-weight: 700;
      color: #dfdfdf;
      font-size: 12rem;
      white-space: nowrap;
      z-index: 4;
    }

    &__text {
      position: relative;
      right: -157px;
      // min-width: 577px;
      max-width: 42vw;
      z-index: 3;

      @media all and (max-width: 980px) {
        .image-with-text-overlay__title.dark, .image-with-text-overlay__description.dark {
          color: #fff !important;
        }
      }
    }

    &__image {
      width: 100%;
      max-width: 1080px;
      z-index: 2;
    }

    &__title {
      // @extend .heading-md;
    }

    &__description {
      // @extend .paragraph-sm;
      margin-top: 19px;
      ul {
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
  }

  //Media 

  @media screen and (max-width: 1280px) {
    .image-with-text-overlay {
      &__content {
        background-color: rgba(0,0,0,1);
      }
      &__image {
        max-width: 100%;
        opacity: 0.8;
      }
      &__title {
        color: white;
      }
      &__text {
        left: 50%;
        transform: translateX(-50%);
        right: unset;
        position: absolute;
        max-width: 100%;
        color: white;
      }
      &__bgtext {
        font-size: 2rem;
      }
    }
  }
</style>
