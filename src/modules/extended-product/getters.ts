import { divideProductNoPlan } from "./separateByColors";

export default {
  separatedProducts(state) {
    return state.list.items
      ? [].concat.apply([], state.list.items.map(v => divideProductNoPlan(v)))
      : [];
  },

  separatedProductsLeaveChildrens(state) {
    return state.list.items
      ? [].concat.apply(
          [],
          state.list.items.map(v => {
            try {
              const tmp = divideProductNoPlan(
                v,
                undefined,
                true
              );
              return tmp;
            } catch (e) {
              console.error("[Extended-Product] ", e);
            }
          })
        )
      : [];
  }
};
