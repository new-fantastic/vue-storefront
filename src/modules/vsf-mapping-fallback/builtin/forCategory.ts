import { removeStoreCodeFromRoute } from "@vue-storefront/core/lib/multistore";
import { Payload } from "../types/Payload";

export const forCategory = async ({ dispatch }, { url }: Payload) => {
  url = removeStoreCodeFromRoute(url) as string;
  const slug = url.split("/").reverse()[0];

  try {
    const category = await dispatch(
      "category/single",
      { key: "url_key", value: slug },
      { root: true }
    );
    if (category !== null) {
      return {
        name: "category",
        params: {
          slug: category.slug
        }
      };
    }
  } catch {
    return undefined;
  }
};
