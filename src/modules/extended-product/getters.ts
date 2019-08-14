import { divideProduct } from './separateByColors'

export default {

  separatedProducts (state) {
    return state.list.items ? [].concat.apply([], state.list.items.map(v => divideProduct(v))) : []
  }

}