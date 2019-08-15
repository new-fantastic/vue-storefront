import { FeaturedState } from '../types/FeaturedState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<FeaturedState, any> = {

  certainSkus: state => skus => {
    // .filter(v => skus.includes(v.sku))
    const returnable = []
    for (const [key, value] of Object.entries(state.products)) {
      if (skus.includes(key)) {
        returnable.push(value)
      }
    }
    return returnable
  }

}