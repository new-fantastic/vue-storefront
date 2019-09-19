import GetCategoryIds from '../../util/GetCategoryIds';

const mock = [
  {
    rule_id: 4,
    name: 'Coupon',
    store_labels: [],
    description: '',
    website_ids: [1, 2],
    customer_group_ids: [0, 1, 2, 3],
    from_date: '2019-09-04',
    uses_per_customer: 0,
    is_active: true,
    condition: {
      condition_type: 'MagentoSalesRuleModelRuleConditionCombine',
      aggregator_type: 'all',
      operator: null,
      value: true
    },
    action_condition: {
      condition_type: 'MagentoSalesRuleModelRuleConditionProductCombine',
      aggregator_type: 'all',
      operator: null,
      value: '1'
    },
    stop_rules_processing: false,
    is_advanced: true,
    sort_order: 0,
    simple_action: 'by_percent',
    discount_amount: 15,
    discount_step: 0,
    apply_to_shipping: false,
    times_used: 0,
    is_rss: true,
    coupon_type: 'SPECIFIC_COUPON',
    use_auto_generation: false,
    uses_per_coupon: 0,
    simple_free_shipping: '0'
  },
  {
    rule_id: 1,
    name: 'Bottoms15',
    store_labels: [],
    description: '',
    website_ids: [1, 2],
    customer_group_ids: [0, 1, 2, 3],
    from_date: '2019-08-08',
    uses_per_customer: 0,
    is_active: true,
    condition: {
      condition_type: 'MagentoSalesRuleModelRuleConditionCombine',
      conditions: [
        {
          condition_type: 'MagentoSalesRuleModelRuleConditionProductFound',
          conditions: [
            {
              condition_type: 'MagentoSalesRuleModelRuleConditionProduct',
              operator: '==',
              attribute_name: 'category_ids',
              value: '15'
            }
          ],
          aggregator_type: 'all',
          operator: null,
          value: '1'
        }
      ],
      aggregator_type: 'all',
      operator: null,
      value: '1'
    },
    action_condition: {
      condition_type: 'MagentoSalesRuleModelRuleConditionProductCombine',
      conditions: [
        {
          condition_type: 'MagentoSalesRuleModelRuleConditionProduct',
          operator: '==',
          attribute_name: 'category_ids',
          value: '15',
          conditions: [
            {
              condition_type: 'MagentoSalesRuleModelRuleConditionProduct',
              operator: '==',
              attribute_name: 'category_ids',
              value: '19'
            }
          ]
        },
        {
          condition_type: 'MagentoSalesRuleModelRuleConditionProduct',
          operator: '==',
          attribute_name: 'category_ids',
          value: '255'
        }
      ],
      aggregator_type: 'all',
      operator: null,
      value: '1'
    },
    stop_rules_processing: false,
    is_advanced: true,
    sort_order: 0,
    simple_action: 'by_percent',
    discount_amount: 15,
    discount_step: 0,
    apply_to_shipping: false,
    times_used: 86,
    is_rss: true,
    coupon_type: 'NO_COUPON',
    use_auto_generation: false,
    uses_per_coupon: 0,
    simple_free_shipping: '0'
  }
];

describe('GetCategoryIds', () => {
  it('returns proper category id', () => {
    const categoryId = GetCategoryIds(mock[1]);
    expect(categoryId).toEqual([15, 19, 255]);
  });
});
