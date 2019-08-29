import ConsumeCondition from "../../util/ConsumeCondition";

jest.mock("@vue-storefront/core/lib/logger", () => ({
  Logger: {
    warn: a => {}
  }
}));

const exampleData: any[] = [
  {
    condition: {
      condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Combine",
      conditions: [
        {
          condition_type:
            "Magento\\SalesRule\\Model\\Rule\\Condition\\Product\\Found",
          conditions: [
            {
              condition_type:
                "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
              operator: "==",
              attribute_name: "category_ids",
              value: "5"
            }
          ],
          aggregator_type: "all",
          operator: null,
          value: "1"
        }
      ],
      aggregator_type: "all",
      operator: null,
      value: "1"
    },
    simple_action: "by_percent",
    discount_amount: 50
  },
  {
    condition: {
      condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Combine",
      conditions: [
        {
          condition_type:
            "Magento\\SalesRule\\Model\\Rule\\Condition\\Product\\Found",
          conditions: [
            {
              condition_type:
                "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
              operator: "==",
              attribute_name: "drop",
              value: "28"
            },
            {
              condition_type:
                "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
              operator: "{}",
              attribute_name: "style",
              value: ["43"]
            }
          ],
          aggregator_type: "all",
          operator: null,
          value: "1"
        }
      ],
      aggregator_type: "all",
      operator: null,
      value: "1"
    },
    simple_action: "by_percent",
    discount_amount: 25
  }
];

// {
//   condition_type: "MagentoSalesRuleModelRuleConditionProduct",
//     operator: "==",
//       attribute_name: "category_ids",
//         value: "5"
// }

// Only support for MagentoSalesRuleModelRuleConditionProduct Currently

const sampleProductCondition: any = {
  condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
  operator: "==",
  attribute_name: "drop",
  value: "28"
};

const sampleFoundProduct: any = {
  condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Product\\Found",
  conditions: [
    {
      condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
      operator: "==",
      attribute_name: "drop",
      value: "28"
    },
    {
      condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
      operator: "{}",
      attribute_name: "style",
      value: ["43"]
    }
  ],
  aggregator_type: "all",
  operator: null,
  value: "1"
};

const sampleConditionsCombine: any = {
  condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Combine",
  conditions: [
    {
      condition_type:
        "Magento\\SalesRule\\Model\\Rule\\Condition\\Product\\Found",
      conditions: [
        {
          condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
          operator: "==",
          attribute_name: "drop",
          value: "28"
        },
        {
          condition_type: "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
          operator: "{}",
          attribute_name: "style",
          value: ["43"]
        }
      ],
      aggregator_type: "all",
      operator: null,
      value: "1"
    }
  ],
  aggregator_type: "all",
  operator: null,
  value: "1"
};

describe("ConsumeCondition.ts", () => {
  it("ProductCondition - returns false for unknown attribute", () => {
    const product = {};
    const result = ConsumeCondition(product, sampleProductCondition);

    expect(result).toBeFalsy();
  });

  it("ProductCondition - returns false for unknown operator", () => {
    const product = {};
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "#-$$"
    });

    expect(result).toBeFalsy();
  });

  it("SimplestCompare - Operator: == - Array.a.includes.b - true", () => {
    const product = {
      drop: [5, 28]
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "==",
      value: "28"
    });

    expect(result).toBeTruthy();
  });

  it("SimplestCompare - Operator: == - Array.a.includes.b - false", () => {
    const product = {
      drop: [5, 28]
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "==",
      value: "634"
    });

    expect(result).toBeFalsy();
  });

  it("SimplestCompare - Operator: == - String.a.equals.b - true", () => {
    const product = {
      drop: 28
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "==",
      value: "28"
    });

    expect(result).toBeTruthy();
  });

  it("SimplestCompare - Operator: == - String.a.equals.b - false", () => {
    const product = {
      drop: 28
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "==",
      value: "634"
    });

    expect(result).toBeFalsy();
  });

  // {}
  it("SimplestCompare - Operator: {} - Array.a includes at least one from Array.b - true", () => {
    const product = {
      drop: [5, 28]
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "{}",
      value: ["5", 16]
    });

    expect(result).toBeTruthy();
  });

  it("SimplestCompare - Operator: {} - Array.a includes at least one from Array.b - false", () => {
    const product = {
      drop: [5, 28]
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "{}",
      value: [89, "12"]
    });

    expect(result).toBeFalsy();
  });

  it("SimplestCompare - Operator: {} - Array.b includes String.a - true", () => {
    const product = {
      drop: 28
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "{}",
      value: ["28", 56, 123]
    });

    expect(result).toBeTruthy();
  });

  it("SimplestCompare - Operator: {} - Array.b includes String.a - false", () => {
    const product = {
      drop: 28
    };
    const result = ConsumeCondition(product, {
      ...sampleProductCondition,
      operator: "==",
      value: [11, 56, 12]
    });

    expect(result).toBeFalsy();
  });

  it("FewProductConditions - false for unknown agregator", () => {
    const product = {
      drop: 28
    };
    const result = ConsumeCondition(product, {
      ...sampleFoundProduct,
      aggregator_type: "xcxcx"
    });

    expect(result).toBeFalsy();
  });

  it("FewProductConditions - aggregator all - true", () => {
    const product = {
      drop: 28,
      style: 43
    };
    const result = ConsumeCondition(product, {
      ...sampleFoundProduct,
      aggregator_type: "all"
    });

    expect(result).toBeTruthy();
  });

  it("FewProductConditions - aggregator all - false", () => {
    const product = {
      drop: 28,
      style: 4992
    };
    const result = ConsumeCondition(product, {
      ...sampleFoundProduct,
      aggregator_type: "all"
    });

    expect(result).toBeFalsy();
  });

  it("ConditionsCombine - false for unknown agregator", () => {
    const product = {
      drop: 28
    };
    const result = ConsumeCondition(product, {
      ...sampleConditionsCombine,
      aggregator_type: "xcxcx"
    });

    expect(result).toBeFalsy();
  });

  it("ConditionsCombine - aggregator all - true", () => {
    const product = {
      drop: 28,
      style: 43
    };
    const result = ConsumeCondition(product, {
      ...sampleConditionsCombine,
      aggregator_type: "all"
    });

    expect(result).toBeTruthy();
  });

  it("ConditionsCombine - aggregator all - false", () => {
    const product = {
      drop: 28,
      style: 4992
    };
    const result = ConsumeCondition(product, {
      ...sampleConditionsCombine,
      aggregator_type: "all"
    });

    expect(result).toBeFalsy();
  });

  it("Everything works - aggregator all - true", () => {
    const product = {
      category_ids: 5
    };
    const result = ConsumeCondition(product, exampleData[0].condition);

    expect(result).toBeTruthy();

    const product2 = {
      drop: 28,
      style: 43
    };
    const result2 = ConsumeCondition(product2, exampleData[1].condition);

    expect(result2).toBeTruthy();
  });
});
