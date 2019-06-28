import { MutationTree } from 'vuex'
import * as types from './mutation-types'

export const mutations: MutationTree<any> = {
  [types.CCS_STORE] (state, payload) {
    state.sales = {}
    for(let item of payload) {
      if(item.name.indexOf('catalog') !== 0) {
        continue;
      }

      for (let cId of item.action_condition.conditions[0].value.split(',')) {
        state.sales = {
          ...state.sales,
          [Number(cId.trim())]: item.discount_amount
        }
      }
    }
  }
}