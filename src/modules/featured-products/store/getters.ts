import { FeaturedState } from '../types/FeaturedState'
import { GetterTree } from 'vuex';

export const getters: GetterTree<FeaturedState, any> = {

  certainSkus: state => skus => Object.values(state.products).filter(v => skus.includes(v.sku))

}