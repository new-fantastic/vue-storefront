import { divideProduct } from "./separateByColors";

export default {
  separatedProducts(state) {
    // console.log(state.list.items.map(v => ({ name: v.name, primary: v.product_label_primary})))
    return state.list.items
    return state.list.items
      ? [].concat.apply([], state.list.items.map(v => divideProduct(v)))
      : [];
  },

  separatedProductsLeaveChildrens(state) {
    return state.list.items
      ? [].concat.apply(
          [],
          state.list.items.map(v => {
            try {
              const tmp = divideProduct(
                v,
                undefined,
                undefined,
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
