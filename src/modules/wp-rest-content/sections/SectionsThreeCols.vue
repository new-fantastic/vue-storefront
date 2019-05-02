<template>
  <div class="container">
    <div
      v-if="data"
      :class="{
        'section-wp three-cols': true,
        'section-wp three-cols--sm': data.ThreeCols_size === 'sm',
        'section-wp three-cols--lg': data.ThreeCols_size === 'lg',
        'section-wp three-cols--with-text': data.ThreeCols_center_bool
      }"
    >
      <div
        v-if="data.ThreeCols_left"
        class="three-cols__col three-cols__col--left"
      >
        <img
          v-if="data.ThreeCols_left.ThreeCols_left_image"
          class="three-cols__img"
          :src="data.ThreeCols_left.ThreeCols_left_image"
          :alt="data.ThreeCols_left.ThreeCols_left_image.alt"
        >

        <img
          v-if="data.ThreeCols_left.ThreeCols_left_image_mobile"
          class="three-cols__img mobile"
          :src="data.ThreeCols_left.ThreeCols_left_image_mobile"
        >

        <div class="three-cols__content-wrap">
          <div class="three-cols__content">
            <h2 class="three-cols__content__title"
              :class="{
              'light' : data.ThreeCols_left.text_color === 'Jasny',
              'dark' : data.ThreeCols_left.text_color === 'Ciemny'
            }">
              {{ data.ThreeCols_left.ThreeCols_left_title }}
            </h2>

            <h3 class="three-cols__content__subtitle"
              :class="{
              'light' : data.ThreeCols_left.text_color === 'Jasny',
              'dark' : data.ThreeCols_left.text_color === 'Ciemny'
            }" v-html="data.ThreeCols_left.ThreeCols_left_subtitle"></h3>

            <BaseButton
              v-if="data.ThreeCols_left.ThreeCols_left_btn"
              class="three-cols__content__btn"
              :class="{ 
                'light' : data.ThreeCols_left.button_color === 'Jasny',
                'dark' : data.ThreeCols_left.button_color === 'Ciemny'
              }"
              :externalLink="true"
              :link="data.ThreeCols_left.ThreeCols_left_btn.url"
            >
              {{ data.ThreeCols_left.ThreeCols_left_btn.title }}
            </BaseButton>
          </div>
        </div>
      </div>

      <div
        v-if="data.ThreeCols_center"
        class="three-cols__col three-cols__col--center"
      >
        <img
          v-if="data.ThreeCols_center.ThreeCols_center_image"
          class="three-cols__img"
          :src="data.ThreeCols_center.ThreeCols_center_image.url"
          :alt="data.ThreeCols_center.ThreeCols_center_image.alt"
        >

        <img
          v-if="data.ThreeCols_center.ThreeCols_center_image_mobile"
          class="three-cols__img mobile"
          :src="data.ThreeCols_center.ThreeCols_center_image_mobile"
        >

        <div class="three-cols__content-wrap">
          <div class="three-cols__content">
            <h2 class="three-cols__content__title"
              :class="{
              'light' : data.ThreeCols_center.text_color === 'Jasny',
              'dark' : data.ThreeCols_center.text_color === 'Ciemny'
            }">
              {{ data.ThreeCols_center.ThreeCols_center_title }}
            </h2>

            <h3 class="three-cols__content__subtitle"
              :class="{
              'light' : data.ThreeCols_center.text_color === 'Jasny',
              'dark' : data.ThreeCols_center.text_color === 'Ciemny'
            }"
              v-html="data.ThreeCols_center.ThreeCols_center_subtitle"></h3>

            <BaseButton
              v-if="data.ThreeCols_center.ThreeCols_center_btn"
              class="three-cols__content__btn"
              :class="{ 
                'light' : data.ThreeCols_center.button_color === 'Jasny',
                'dark' : data.ThreeCols_center.button_color === 'Ciemny'
              }"
              :externalLink="true"
              :link="data.ThreeCols_center.ThreeCols_center_btn.url"
            >
              {{ data.ThreeCols_center.ThreeCols_center_btn.title }}
            </BaseButton>
          </div>
        </div>
      </div>

      <div
        v-if="data.ThreeCols_right"
        class="three-cols__col three-cols__col--right"
      >
        <img
          v-if="data.ThreeCols_right.ThreeCols_right_image"
          class="three-cols__img"
          :src="data.ThreeCols_right.ThreeCols_right_image.url"
          :alt="data.ThreeCols_right.ThreeCols_right_image.alt"
        >

        <img
          v-if="data.ThreeCols_right.ThreeCols_right_image_mobile"
          class="three-cols__img mobile"
          :src="data.ThreeCols_right.ThreeCols_right_image_mobile"
        >

        <div class="three-cols__content-wrap">
          <div class="three-cols__content">
            <h2 class="three-cols__content__title"
              :class="{
              'light' : data.ThreeCols_right.text_color === 'Jasny',
              'dark' : data.ThreeCols_right.text_color === 'Ciemny'
            }">
              {{ data.ThreeCols_right.ThreeCols_right_title }}
            </h2>

            <h3 class="three-cols__content__subtitle"
              :class="{
              'light' : data.ThreeCols_right.text_color === 'Jasny',
              'dark' : data.ThreeCols_right.text_color === 'Ciemny'
            }"
              v-html="data.ThreeCols_right.ThreeCols_right_subtitle"></h3>

            <BaseButton
              v-if="data.ThreeCols_right.ThreeCols_right_btn"
              class="three-cols__content__btn"
              :class="{ 
                'light' : data.ThreeCols_right.button_color === 'Jasny',
                'dark' : data.ThreeCols_right.button_color === 'Ciemny'
              }"
              :externalLink="true"
              :link="data.ThreeCols_right.ThreeCols_right_btn.url"
            >
              {{ data.ThreeCols_right.ThreeCols_right_btn.title }}
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

  .three-cols {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // @media all and (max-width: 980px) {
    //   flex-direction: column
    // }

    &--sm {
      .three-cols__col {
       height: 570px;
       @media all and (max-width: 980px) {
         height: 54vh;
       }
      }

      .three-cols__content__title {
        // @extend .heading-md;
      }
    }

    &--lg {
      .three-cols__col {
        height: 750px;
        @media all and (max-width: 980px) {
         height: 69vh;
        }
       &--center {
         @media all and (max-width: 980px) {
          min-height: 69vh;
          height: auto;
          overflow: hidden;

          > .three-cols__content-wrap {
            position: relative;
            padding: 30px 10px;
          }
         }
       }
      }

      .three-cols__content__title {
        // @extend .heading-lg;
      }
    }

    &--with-text {
      .three-cols__col {
        position: relative;
        width: 100%;
      }

      .three-cols__center {
        max-width: 500px;
        width: 100%;
        margin: 0px 66px;
      }
    }
    @media all and (min-width: 980px) {
      &:not(.three-cols--with-text) {
        .three-cols__col {
          position: relative;
          width: calc(33% - 30px);

          
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

        .three-cols__content {
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
        // color: $color-white;
        color: #fff;
        font-size: 3rem;
        font-weight: 700;
      transition: .3s all ease-out;
      }

      &__subtitle {
        // @extend .paragraph-md;
        // color: $color-white;
        color: #fff;
        color: #fff;
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
        // color: $color-black;
        color: #000;
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
    .three-cols {
      flex-wrap: wrap;
      height: auto;
      &__col {
        position: relative;
        width: 100%;
        &--left, &--center {
          margin: 0 0 2rem 0;
        }
      }
    }
  }
</style>
