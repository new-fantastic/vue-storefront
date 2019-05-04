  import NumberToWord from '../util/NumberToWord'
  import ColLayout from './grid/ColLayout.vue'

  export default {
    functional: true,
    props: {
      renderSingle: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: null,
        validator(value) {
          if(!('acf' in value)) {
            return false
          }
          if(!('section' in value.acf)) {
            return false
          }

          if(value.acf.section.lenght < 1) {
            return false
          }

          return true
        }
      }
    },
    render(h, context) {
      if(context.props.data && context.props.data.acf && context.props.data.acf.section) {

        if(context.props.renderSingle) {
          return h(ColLayout, {
            props: {
              data: context.props.data.acf.section[0]
            }
          })
        } else {
          const sections = []
          context.props.data.acf.section.forEach((el, index) => {

            sections.push(
              h(ColLayout, {
                props: {
                  data: el
                }
              })
            )

          })

          return sections
        }
      }
    }
  }
