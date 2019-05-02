<template>
  <div class="container">
    <div
      v-if="data"
      :class="{
        'section-wp two-cols': true,
        'section-wp two-cols--sm': data.TwoCols_size === 'sm',
        'section-wp two-cols--lg': data.TwoCols_size === 'lg',
        'section-wp two-cols--with-text': data.TwoCols_center_bool
      }"
    >
      <div
        v-if="data.TwoCols_left"
        class="two-cols__col two-cols__col--left"
      >
        <img
          v-if="data.TwoCols_left.TwoCols_left_image"
          class="two-cols__img"
          :src="data.TwoCols_left.TwoCols_left_image.url"
          :alt="data.TwoCols_left.TwoCols_left_image.alt"
        >

        <img
          v-if="data.TwoCols_left.TwoCols_left_image_mobile"
          class="two-cols__img mobile"
          :src="data.TwoCols_left.TwoCols_left_image_mobile"
        >

        <div class="two-cols__content-wrap">
          <div class="two-cols__content">
            <h2 class="two-cols__content__title"
              :class="{
              'light' : data.TwoCols_left.text_color === 'Jasny',
              'dark' : data.TwoCols_left.text_color === 'Ciemny'
            }">
              {{ data.TwoCols_left.TwoCols_left_title }}
            </h2>

            <div class="two-cols__content__subtitle"
              :class="{
                'light' : data.TwoCols_left.text_color === 'Jasny',
                'dark' : data.TwoCols_left.text_color === 'Ciemny'
              }"
              v-html="data.TwoCols_left.TwoCols_left_subtitle"
            />

            <BaseButton
              v-if="data.TwoCols_left.TwoCols_left_btn"
              class="two-cols__content__btn"
              :class="{ 
                'light' : data.TwoCols_left.button_color === 'Jasny',
                'dark' : data.TwoCols_left.button_color === 'Ciemny'
              }"
              :externalLink="true"
              :link="data.TwoCols_left.TwoCols_left_btn.url"
            >
              {{ data.TwoCols_left.TwoCols_left_btn.title }}
            </BaseButton>
          </div>
        </div>
      </div>

      <div
        v-if="data.TwoCols_center_bool"
        class="two-cols__center"
      >
        <h2 class="two-cols__center__title"
          :class="{
              'light' : data.TwoCols_right.text_color === 'Jasny',
              'dark' : data.TwoCols_right.text_color === 'Ciemny'
            }">
          {{ data.TwoCols_center_content.TwoCols_center_title }}
        </h2>
        <p class="two-cols__center__description"
          :class="{
              'light' : data.TwoCols_right.text_color === 'Jasny',
              'dark' : data.TwoCols_right.text_color === 'Ciemny'
            }">
          {{ data.TwoCols_center_content.TwoCols_center_description }}
        </p>
      </div>

      <div
        v-if="data.TwoCols_right"
        class="two-cols__col two-cols__col--right"
      >
        <img
          v-if="data.TwoCols_right.TwoCols_right_image"
          class="two-cols__img"
          :src="data.TwoCols_right.TwoCols_right_image.url"
          :alt="data.TwoCols_right.TwoCols_right_image.alt"
        >

        <img
          v-if="data.TwoCols_right.TwoCols_right_image_mobile"
          class="two-cols__img mobile"
          :src="data.TwoCols_right.TwoCols_right_image_mobile"
        >

        <div class="two-cols__content-wrap">
          <div class="two-cols__content">
            <h2 class="two-cols__content__title"
              :class="{
              'light' : data.TwoCols_right.text_color === 'Jasny',
              'dark' : data.TwoCols_right.text_color === 'Ciemny'
            }">
              {{ data.TwoCols_right.TwoCols_right_title }}
            </h2>

            <div class="two-cols__content__subtitle"
              :class="{
                'light' : data.TwoCols_right.text_color === 'Jasny',
                'dark' : data.TwoCols_right.text_color === 'Ciemny'
              }"
              v-html="data.TwoCols_right.TwoCols_right_subtitle"
            />

            <BaseButton
              v-if="data.TwoCols_right.TwoCols_right_btn"
              class="two-cols__content__btn"
              :class="{ 
                'light' : data.TwoCols_right.button_color === 'Jasny',
                'dark' : data.TwoCols_right.button_color === 'Ciemny'
              }"
              :externalLink="true"
              :link="data.TwoCols_right.TwoCols_right_btn.url"
            >
              {{ data.TwoCols_right.TwoCols_right_btn.title }}
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

  .two-cols {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // @media all and (max-width: 980px) {
    //   flex-direction: column
    // }

    &--sm {
      .two-cols__col {
       height: 570px;
       @media all and (max-width: 980px) {
         height: 54vh;
       }
      }

      .two-cols__content__title {
        // @extend .heading-md;
      }
    }

    &--lg {
      .two-cols__col {
        height: 750px;
        @media all and (max-width: 980px) {
         height: 69vh;
       }
      }

      .two-cols__content__title {
        // @extend .heading-lg;
      }
    }

    &--with-text {
      .two-cols__col {
        position: relative;
        width: 100%;
      }

      .two-cols__center {
        max-width: 500px;
        width: 100%;
        margin: 0px 66px;
      }
    }
    @media all and (min-width: 980px) {
      &:not(.two-cols--with-text) {
        .two-cols__col {
          position: relative;
          width: calc(50% - 15px);

          &:nth-child(2) {
            margin-left: 30px;
          }
        }
      }
    }

    &__img {
      position: absolute;
      z-index: 2;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    &__content-wrap {
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
      background: #0004;
      transition: .3s all ease-out;
      // cursor: pointer;

      &:hover {
        background: #0008;

        .two-cols__content {
          // &__title,
          // &__subtitle {
          //   opacity: .3;
          // }
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100%;
      max-width: 370px;
      margin: 0 auto;
      transition: .3s all ease-out;

      &__title {
        color: #fff;
        // color: $color-white;
        font-size: 3rem;
        font-weight: 700;
      transition: .3s all ease-out;
      }

      &__subtitle {
        // @extend .paragraph-md;
        color: #fff;
        // color: $color-white;
      transition: .3s all ease-out;
      }

      &__btn {
        margin-top: 36px;
      }
    }

    &__center {
      text-align: center;

      &__title {
        // @extend .heading-lg;
        color: #000;
        // color: $color-black;
      }

      &__description {
        // @extend .paragraph;
        margin-top: 2rem;
        // color: $color-black;
        color: #000;
      }
    }
  }

  //Media

  @media screen and (max-width: 980px) {
    .two-cols {
      flex-wrap: wrap;
      height: auto;
      &__col {
        position: relative;
        width: 100%;
        &--left {
          margin: 0 0 2rem 0;
        }
      }
    }
  }
</style>
