<template>
  <div class="container">
    <div
      v-if="data"
      :class="{
        'section-wp image-with-text': true,
        'section-wp image-with-text--left': data.ImageWithText_layout === 'imageLeft',
        'section-wp image-with-text--sm': data.ImageWithText_height == 'sm',
        'section-wp image-with-text--lg': data.ImageWithText_height == 'lg'
      }"
    >
      <div
        v-if="data.ImageWithText_textcol"
        class="image-with-text__content-wrap"
      >
        <div class="image-with-text__content">
          <h2 class="image-with-text__content__title"
            :class="{
              'light' : data.ImageWithText_textcol.text_color === 'Jasny',
              'dark' : data.ImageWithText_textcol.text_color === 'Ciemny'
            }">
            {{ data.ImageWithText_textcol.ImageWithText_textcol_title }}
          </h2>
          <div
            v-html="data.ImageWithText_textcol.ImageWithText_textcol_description"
            class="image-with-text__content__description"
            :class="{
              'light' : data.ImageWithText_textcol.text_color === 'Jasny',
              'dark' : data.ImageWithText_textcol.text_color === 'Ciemny'
            }"
          />
        </div>
      </div>

      <div
        v-if="data.ImageWithText_imgcol"
        :class="{
          'image-with-text__image': true,
          'image-with-text__image--sm': data.ImageWithText_imgcol.ImageWithText_imgcol_size === 'sm',
          'image-with-text__image--lg': data.ImageWithText_imgcol.ImageWithText_imgcol_size === 'lg'
        }"
      >
        <img
          v-if="data.ImageWithText_imgcol.ImageWithText_imgcol_image_mobile"
          :src="data.ImageWithText_imgcol.ImageWithText_imgcol_image_mobile"
        >
        <img
          v-else-if="data.ImageWithText_imgcol.ImageWithText_imgcol_image"
          :src="data.ImageWithText_imgcol.ImageWithText_imgcol_image.url"
          :alt="data.ImageWithText_imgcol.ImageWithText_imgcol_image.alt"
        >

        <div class="image-with-text__image__content">
          <div class="image-with-text__image__content__inner">
            <h2 class="image-with-text__image__content__title"
              :class="{
                'light' : data.ImageWithText_imgcol.text_color === 'Jasny',
                'dark' : data.ImageWithText_imgcol.text_color === 'Ciemny'
              }">
              {{ data.ImageWithText_imgcol.ImageWithText_imgcol_title }}
            </h2>

            <BaseButton
              v-if="data.ImageWithText_imgcol.ImageWithText_imgcol_btn"
              class="image-with-text__image__content__btn"
              :class="{ 
                'light' : data.ImageWithText_imgcol.button_color === 'Jasny',
                'dark' : data.ImageWithText_imgcol.button_color === 'Ciemny'
              }"
              :link="data.ImageWithText_imgcol.ImageWithText_imgcol_btn.url"
            >
              {{ data.ImageWithText_imgcol.ImageWithText_imgcol_btn.title }}
            </BaseButton>
          </div>
        </div>
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

  .image-with-text {
    display: flex;
    justify-content: flex-end;

    @media all and (max-width: 980px) {
        margin-top: 3rem !important;
    }

    &--left {
      justify-content: flex-start;

      .image-with-text__image{
        order: 1;
      }

      .image-with-text__content-wrap{
        order: 2;
        padding-right: 3vw;
        padding-left: 7vw;
      }
    }

    &--sm {
      height: 750px;
    }

    &--lg {
      height: 870px;
    }

    &__content {
      // color: $color-black;
      color: #000;

      &-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: 100%;
        width: 100%;
        padding-right: 7vw;
        padding-left: 6vw;
      }

      &__title {
        // @extend .heading-md;
      }

      &__description {
        // @extend .paragraph;
        margin-top: 2rem;
        line-height: 1.8;

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

    &__image {
      position: relative;

      &--sm {
        min-width: 750px;
      }

      &--lg {
        min-width: 870px;
      }

      img {
        position: absolute;
        z-index: 2;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
      }

      &__content {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 1;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;

        &__inner {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 370px;
          margin: 0 auto;
        }

        &__title {
          // @extend .heading-lg;
          // color: $color-white;
          color: #fff;
        }

        &__btn {
          margin-top: 36px;
        }
      }
    }
  }

  //Media

  @media screen and (max-width: 1200px) {
    .staticpage .section-wp {
      margin: 2.5rem auto;
    }
    .image-with-text {
      flex-direction: column;
      &__content-wrap {
        padding-left: 0;
        padding-right: 0;
      }
      &__image {
        min-width: 100%;
        margin: 2rem 0 0 0;
        img {
          position: static;
        }
      }
      &--sm {
        height: auto;
      }
    }
    .image-with-text--left .image-with-text__content-wrap {
      padding-left: 0;
      padding-right: 0;
      order: unset;
    }
  }

  @media screen and (max-width: 980px) {
    .staticpage .section-wp {
      margin-top: 5.5rem !important; 
    }
    .image-with-text {
      &__image {
        min-width: 100%;
        margin: 3rem 0 0 0;
      }
    }
  }
</style>
