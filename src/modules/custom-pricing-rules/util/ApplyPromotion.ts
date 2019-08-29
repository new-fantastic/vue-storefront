import { Logger } from "@vue-storefront/core/lib/logger";

const KNOWN_ACTIONS = ["by_percent"];

interface Product {
  price: number;
  priceInclTax: number;
  priceTax: number;
  [propName: string]: any;
}

export default (
  product: any,
  simpleAction: string,
  discountAmount: string | number
) => {
  if (!KNOWN_ACTIONS.includes(simpleAction)) {
    Logger.warn("[CPR] - Unknown promotion action");
    return product;
  }

  if (simpleAction === "by_percent") {
    const localProduct = { ...product };
    const newPrice =
      localProduct.priceInclTax * ((100 - +discountAmount) / 100);
    const newPriceTax =
      newPrice * (localProduct.priceTax / localProduct.priceInclTax);
    return {
      ...localProduct,
      originalPrice: localProduct.price,
      originalPriceInclTax: localProduct.priceInclTax,
      originalPriceTax: localProduct.priceTax,
      priceInclTax: newPrice,
      priceTax: newPriceTax,
      price: newPrice - newPriceTax,
      specialPriceInclTax: newPrice,
      specialPriceTax: newPriceTax,
      special_price: newPrice - newPriceTax
    };
  }
};
