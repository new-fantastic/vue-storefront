import { mutations } from './mutations'
import { actions } from './actions'
import { state } from './state'

export const module = {
  namespaced: true,
  state,
  mutations,
  actions
}
