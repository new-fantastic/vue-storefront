import { Module } from "vuex";
import { CPRState } from "../types/CPRState";
import { mutations } from "./mutations";
// import { getters } from "./getters";
import { actions } from "./actions";
import { state } from "./state";

export const module: Module<CPRState, any> = {
  namespaced: true,
  mutations,
  actions,
  // getters,
  state
};
