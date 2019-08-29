import { CPRState } from "../types/CPRState";
import { ActionTree } from "vuex";
import * as types from "./mutation-types";
import config from "config";
import fetch from "isomorphic-fetch";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";

export const actions: ActionTree<CPRState, any> = {
  async loadRules({ commit }) {
    try {
      const { storeCode } = currentStoreView();
      let r = await fetch(
        `${
          config.api.url.endsWith("/") ? config.api.url : config.api.url + "/"
        }api/ext/custom-pricing-rules/cart-price-rules${
          storeCode ? "/" + storeCode : ""
        }`
      );

      let { result } = await r.json();

      commit(types.SET_RULES, result.items);
    } catch (e) {
      console.error(e);
    }
  }
};
