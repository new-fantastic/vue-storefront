export default (product, rules, category) => {
  let fulfills = false;
  let promoObj: any = {};
  console.log("a");
  for (let rule of rules) {
    console.log("b");
    if (rule.condition && rule.condition.conditions) {
      console.log("c");

      let passedConditions = true;
      const conditions = rule.condition.conditions[0].conditions;

      for (let condition of conditions) {
        console.log("d");

        if (
          condition.condition_type !==
          "Magento\\SalesRule\\Model\\Rule\\Condition\\Product"
        ) {
          // only support for that currently
          passedConditions = false;
          break;
        }
        if (!product.hasOwnProperty(condition.attribute_name)) {
          passedConditions = false;
          break;
        }
        if (
          !compare(
            product[condition.attribute_name],
            condition.operator,
            condition.value,
            condition.attribute_name === "category_ids" ? category : null
          )
        ) {
          console.log(
            "C",
            product[condition.attribute_name],
            condition.operator,
            condition.value
          );
          passedConditions = false;
          break;
        }
      }

      if (passedConditions) {
        fulfills = true;
        promoObj = rule;
        break;
      }
      console.log("ile");
    }
  }

  console.log("tescik", fulfills);
  return fulfills;
  if (fulfills) {
    const newPrice =
      product.priceInclTax * ((100 - promoObj.discount_amount) / 100);
    const newPriceTax = newPrice * (product.priceTax / product.priceInclTax);
    const newProd = {
      ...product,
      originalPrice: product.price,
      originalPriceInclTax: product.priceInclTax,
      originalPriceTax: product.priceTax,
      priceInclTax: newPrice,
      priceTax: newPriceTax,
      price: newPrice - newPriceTax,
      specialPriceInclTax: newPrice,
      specialPriceTax: newPriceTax,
      special_price: newPrice - newPriceTax
    };
    delete newProd.final_price;
    // debugger;
    console.log(newProd);
    return newProd;
  }
  return product;
};
