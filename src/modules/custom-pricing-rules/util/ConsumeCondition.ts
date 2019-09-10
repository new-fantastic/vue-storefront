import { Logger } from "@vue-storefront/core/lib/logger";
// export default (value1, operator, value2, cid = null) => {
//   if (operator === "==") {
//     if (cid) {
//       return cid + "" === value2 + "";
//     }
//     if (Array.isArray(value1)) {
//       return value1.includes(+value2);
//     }
//     return value1 + "" === value2 + "";
//   }
//   if (operator === "{}") {
//     if (Array.isArray(value2)) {
//       for (let v of value2) {
//         if (value1.includes(v)) {
//           return true;
//         }
//       }
//       return false;
//     } else {
//       return value1.includes(value2);
//     }
//   }
// };

interface Condition {
  condition_type: string;
  operator: string;
  attribute_name: string;
  value: string;
}

interface ConditionWrapper {
  condition_type: string;
  conditions: Condition[];
  aggregator_type: string;
  operator: any;
  value: string;
}

interface ConditionWrapperWrapper {
  condition_type: string;
  conditions: ConditionWrapper[];
  aggregator_type: string;
  operator: any;
  value: string;
}

const KNOWN_OPERATORS = [
  "==", // equals
  "{}" // contains
];

const KNOWN_AGGREGATORS = ["all"];

export default (
  source: any,
  condition: Condition | ConditionWrapper | ConditionWrapperWrapper
): boolean => {
  switch (condition.condition_type) {
    case "Magento\\SalesRule\\Model\\Rule\\Condition\\Product":
      return ProductCondition(source, <Condition>condition);
    case "Magento\\SalesRule\\Model\\Rule\\Condition\\Product\\Found":
      return FewProductConditions(source, <ConditionWrapper>condition);
    case "Magento\\SalesRule\\Model\\Rule\\Condition\\Combine":
      return ConditionsCombine(source, <ConditionWrapperWrapper>condition);
    default:
      console.error("Something went wrong!", condition, source);
      return false;
  }
};

const ProductCondition = (product: any, condition: Condition): boolean => {
  // Attribute does not exist in product
  if (!product.hasOwnProperty(condition.attribute_name)) {
    Logger.warn("[CPR] - Unknown attribute " + condition.attribute_name);
    return false;
  }

  // Operator is unknown
  if (!KNOWN_OPERATORS.includes(condition.operator)) {
    Logger.warn("[CPR] - Unknown operator " + condition.operator);
    return false;
  }

  return SimplestCompare(
    product[condition.attribute_name],
    condition.value,
    condition.operator
  );
};

const SimplestCompare = (a: any, b: any, operator: string) => {
  // for (let KNOWN_OPERATOR of KNOWN_OPERATORS) {
    if (operator === "==") {
      if (Array.isArray(a)) {
        // Array A contains value B
        return a.map(v => v + "").includes(b + ""); // Same type
      }
      return a + "" === b + ""; // Same type
    }

    if (operator === "{}") {
      if (Array.isArray(a)) {
        // Array A contains value B
        const aMap = a.map(v => v + "");
        for (let expected of b) {
          if (aMap.includes(expected + "")) {
            return true;
          }
        }
        return false;
      }
      return b.map(v => v + "").includes(a + "");
    }
  // }
};

const FewProductConditions = (
  product: any,
  conditionWrapper: ConditionWrapper
): boolean => {
  if (!KNOWN_AGGREGATORS.includes(conditionWrapper.aggregator_type)) {
    Logger.warn(
      "[CPR] - Unknown aggregator " + conditionWrapper.aggregator_type
    );
    return false;
  }

  const conditions = conditionWrapper.conditions.map(v =>
    ProductCondition(product, v)
  );

  if (conditionWrapper.aggregator_type === "all") {
    return conditions.every(v => v === true);
  }
  return true;
};

const ConditionsCombine = (
  product: any,
  conditionWrapper: ConditionWrapperWrapper
): boolean => {
  if (!KNOWN_AGGREGATORS.includes(conditionWrapper.aggregator_type)) {
    Logger.warn(
      "[CPR] - Unknown aggregator " + conditionWrapper.aggregator_type
    );
    return false;
  }

  if(!conditionWrapper.conditions){
    Logger.warn(
      "[CPR] - Conditions is undefined" + conditionWrapper
    );
    return false
  }
  const conditions = conditionWrapper.conditions.map(v =>
    FewProductConditions(product, v)
  );

  if (conditionWrapper.aggregator_type === "all") {
    return conditions.every(v => v === true);
  }
  return true;
};
