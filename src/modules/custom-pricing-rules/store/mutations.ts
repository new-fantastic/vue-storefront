import { MutationTree } from "vuex";
import * as types from "./mutation-types";
import pick from "lodash-es/pick";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";
import config from "config";

export const mutations: MutationTree<any> = {
  [types.SET_RULES](state, rules) {
    const filteredRules = rules.filter(v => {
      if (v.coupon_type !== "NO_COUPON") return false;
      // Is available?
      const test1 =
        (v.from_date && new Date() >= new Date(v.from_date)) || !v.from_date;
      const test2 =
        (v.to_date && new Date() <= new Date(v.to_date)) || !v.to_date;

      // Is in proper storeView?
      let test3 = !config.storeViews.multistore;
      if (!test3) {
        const { storeId } = currentStoreView();
        test3 = v.website_ids.includes(storeId);
      }

      return test1 && test2 && test3;
    });

    state.rules = [
      ...rules.map(v =>
        pick(v, ["condition", "simple_action", "discount_amount"])
      )
    ];
  }
};
