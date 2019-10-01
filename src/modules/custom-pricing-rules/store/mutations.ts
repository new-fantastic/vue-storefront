import { MutationTree } from 'vuex';
import * as types from './mutation-types';
import pick from 'lodash-es/pick';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import config from 'config';
import GetCategoryIds from '../util/GetCategoryIds';

const shouldUseRule = (rule): Boolean => {
  if (rule.coupon_type !== 'NO_COUPON') return false;
  // Is available?
  const test1 =
    (rule.from_date && new Date() >= new Date(rule.from_date)) || !rule.from_date;
  const test2 =
    (rule.to_date && new Date() <= new Date(rule.to_date)) || !rule.to_date;

  // Is in proper storeView?
  let test3 = !config.storeViews.multistore;
  if (!test3) {
    const { storeId } = currentStoreView();
    test3 = rule.website_ids.includes(storeId);
  }

  return test1 && test2 && test3 && rule.is_active;
}

export const mutations: MutationTree<any> = {
  [types.SET_RULES](state, rules) {
    const filteredRules = rules.filter(v => shouldUseRule(v));

    state.rules = [
      ...filteredRules.map(v =>
        pick(v, ['condition', 'simple_action', 'discount_amount'])
      )
    ];
  },

  [types.SET_CATEGORIES](state, rules) {
    const filteredRules = rules.filter(v => shouldUseRule(v));

    const categories = [];
    for (let condition of filteredRules) {
      const ids = GetCategoryIds(condition);
      if (ids && ids.length) {
        categories.push(...ids);
      }
    }

    state.categories = categories;
  }
};
