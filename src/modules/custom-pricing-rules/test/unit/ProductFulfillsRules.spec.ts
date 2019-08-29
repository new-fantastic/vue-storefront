import ProductFulfillsRules from "../../util/ProductFulfillsRules";

const exampleData = [
  {
    condition: {
      condition_type: "MagentoSalesRuleModelRuleConditionCombine",
      conditions: [
        {
          condition_type: "MagentoSalesRuleModelRuleConditionProductFound",
          conditions: [
            {
              condition_type: "MagentoSalesRuleModelRuleConditionProduct",
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
      condition_type: "MagentoSalesRuleModelRuleConditionCombine",
      conditions: [
        {
          condition_type: "MagentoSalesRuleModelRuleConditionProductFound",
          conditions: [
            {
              condition_type: "MagentoSalesRuleModelRuleConditionProduct",
              operator: "==",
              attribute_name: "drop",
              value: "28"
            },
            {
              condition_type: "MagentoSalesRuleModelRuleConditionProduct",
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

describe("ProductFulfillsRules", () => {
  it("tests", () => {
    expect(true).toBe(false);
  });
});
