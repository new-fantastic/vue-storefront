import ApplyPromotion from "../../util/ApplyPromotion";

jest.mock("@vue-storefront/core/lib/logger", () => ({
  Logger: {
    warn: a => {}
  }
}));

describe("ApplyPromotion", () => {
  it("returns product itself if action is undefined", () => {
    const product = {
      price: 1,
      priceInclTax: 2,
      priceTax: 5
    };
    const newProduct = ApplyPromotion(product, "not-existing-one", 12);
    expect(product).toEqual(newProduct);
  });

  it("counts prices properly", () => {
    const product = {
      price: 30,
      priceInclTax: 50,
      priceTax: 20
    };
    const percent = 10;
    const targetProduct = {
      originalPrice: product.price,
      originalPriceInclTax: product.priceInclTax,
      originalPriceTax: product.priceTax,
      specialPriceInclTax: 45,
      special_price: 27,
      specialPriceTax: 45 - 27,
      priceInclTax: 45,
      price: 27,
      priceTax: 45 - 27
    };
    const newProduct = ApplyPromotion(product, "by_percent", percent);
    expect(targetProduct).toEqual(newProduct);
  });
});
