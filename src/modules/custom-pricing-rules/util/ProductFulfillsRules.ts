import ConsumeCondition from "./ConsumeCondition";
import ApplyPromotion from "./ApplyPromotion";

export default (product, rules, category = null) => {
  let newProduct = { ...product };
  if (category) {
    if (
      newProduct.hasOwnProperty("category_ids") &&
      !newProduct.category_ids.includes(category)
    ) {
      newProduct.category_ids.push(category);
    } else {
      newProduct.category_ids = category;
    }
  }

  for (let rule of rules) {
    if (ConsumeCondition(newProduct, rule.condition)) {
      newProduct = ApplyPromotion(
        newProduct,
        rule.simple_action,
        rule.discount_amount
      );
      break;
    }
  }

  return newProduct;
};
