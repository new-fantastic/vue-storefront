<script>
  import SectionsBannerFullwidth from './SectionsBannerFullwidth.vue'
  import SectionsTwoCols from './SectionsTwoCols.vue'
  import SectionsThreeCols from './SectionsThreeCols.vue'
  import SectionsImageWithText from './SectionsImageWithText.vue'
  import SectionsImageWithTextOverlay from './SectionsImageWithTextOverlay.vue'
  import SectionsInstagram from './SectionsInstagram.vue'
  import SectionsVisualEditor from './SectionsVisualEditor.vue'
  import SectionsWysiwyg from './SectionsWysiwyg.vue'

  const cmpsSections = {
    SectionsBannerFullwidth,
    SectionsTwoCols,
    SectionsThreeCols,
    SectionsImageWithText,
    SectionsImageWithTextOverlay,
    SectionsInstagram,
    SectionsVisualEditor,
    SectionsWysiwyg
  }

  export default {
    functional: true,
    props: {
      renderSingle: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: null
      }
    },
    render(h, context) {
      if(context.props.data && context.props.data.acf && context.props.data.acf.section) {
        if(context.props.renderSingle) {
          return h(cmpsSections[`Sections${renderSingle}`], {
            props: {
              data: context.props.data.acf.section.find(e => e.acf_fc_layout === renderSingle)
            }
          })
        } else {
          const sections = []
          context.props.data.acf.section.forEach((el, index) => {
            sections.push(
              h(cmpsSections[`Sections${el.acf_fc_layout}`], {
                props: {
                  data: el
                },
                key: `${el.acf_fc_layout}-${index}`
              })
            )
          })

          return h('div', {}, sections)
        }
      }
    }
  }
</script>
