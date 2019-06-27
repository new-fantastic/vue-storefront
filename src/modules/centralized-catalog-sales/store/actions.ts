import { SalesState } from '../types/SalesState'
import { ActionTree } from 'vuex';
import * as types from './mutation-types'
import config from 'config'
import axios from 'axios'
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'

const oauth = OAuth({
  consumer: { 
    key: 'nq81kv6upca1ri7yl50s8kgwy09vy7jv', 
    secret: 'ftpiy8grb3tg5mpkp0uz3lhxwaj9cm1r' 
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64')
  }
})

export const actions: ActionTree<SalesState, any> = {
  
  async fetch ({ commit }) {

    if(!('sales' in config)) {
      throw new Error('Config for Centralized Catalog Sales not provided! Add array of IDs, as config.sales!');
    }

    const requestTargetIds = config.sales
    const token = {
      key: '82e46mr971j8jfc6u20ukiywx2qcs4gd',
      secret: 'nkn04h215oqcvj4p8lcblhfofcufbnmm'
    }

    try {
      const requests = []
      // for (let id of requestTargetIds) {
      //   const request_data = {
      //     method: 'GET',
      //     url: `https://checkout.flynwetsuits.com/pln/rest/V1/salesRules/${id}`
      //   }
      //   // console.log('XX', oauth.toHeader(oauth.authorize(request_data)))
      //   requests.push(
      //     axios.get(request_data.url, {
      //       headers: {
      //         ...oauth.toHeader(oauth.authorize(request_data, token)),
      //         'Content-Type': 'application/json'
      //       }
      //     })
      //   );
      // }

      const request_data = {
        method: 'GET',
        url: `https://checkout.flynwetsuits.com/pln/rest/V1/salesRules/4`
      }
      // https://checkout.flynwetsuits.com/pln/rest/V1/salesRules/3/?
      // oauth_consumer_key=nq81kv6upca1ri7yl50s8kgwy09vy7jv
      // &oauth_token=82e46mr971j8jfc6u20ukiywx2qcs4gd
      // &oauth_signature_method=HMAC-SHA1
      // &oauth_timestamp=1561652533
      // &oauth_nonce=AVdIR6&oauth_version=1.0
      // &oauth_signature=9KV4arru+SnbZ+ZbhuIeyRwPT9g=

      const hd = oauth.toHeader(oauth.authorize(request_data, token));
      hd.Authorization = hd.Authorization.replace(
        'oauth_consumer_key="undefined",', 
        'oauth_consumer_key="nq81kv6upca1ri7yl50s8kgwy09vy7jv", oauth_token="82e46mr971j8jfc6u20ukiywx2qcs4gd",')


      await axios.get(request_data.url, {
        headers: {
          ...hd,
          'Content-Type': 'application/json'
        }
      })

      //oauth_consumer_key="undefined"

      // let response = await Promise.all(requests)
    //   const response = [{
    //     "rule_id": 4,
    //     "name": "catalog-60",
    //     "store_labels": [],
    //     "description": "",
    //     "website_ids": [
    //         1,
    //         2
    //     ],
    //     "customer_group_ids": [
    //         0,
    //         1,
    //         2,
    //         3
    //     ],
    //     "from_date": "2019-06-27",
    //     "to_date": "2019-06-30",
    //     "uses_per_customer": 0,
    //     "is_active": true,
    //     "condition": {
    //         "condition_type": "Magento\\SalesRule\\Model\\Rule\\Condition\\Combine",
    //         "aggregator_type": "all",
    //         "operator": null,
    //         "value": "1"
    //     },
    //     "action_condition": {
    //         "condition_type": "Magento\\SalesRule\\Model\\Rule\\Condition\\Product\\Combine",
    //         "conditions": [
    //             {
    //                 "condition_type": "Magento\\SalesRule\\Model\\Rule\\Condition\\Product",
    //                 "operator": "==",
    //                 "attribute_name": "category_ids",
    //                 "value": "18"
    //             }
    //         ],
    //         "aggregator_type": "all",
    //         "operator": null,
    //         "value": "1"
    //     },
    //     "stop_rules_processing": false,
    //     "is_advanced": true,
    //     "sort_order": 0,
    //     "simple_action": "by_percent",
    //     "discount_amount": 60,
    //     "discount_step": 0,
    //     "apply_to_shipping": false,
    //     "times_used": 0,
    //     "is_rss": true,
    //     "coupon_type": "NO_COUPON",
    //     "use_auto_generation": false,
    //     "uses_per_coupon": 0,
    //     "simple_free_shipping": "0"
    // },]

      // commit(types.CCS_STORE, response)

    } catch (e) {
      console.error('Centralized Catalog Sales!')
      console.error(e.response)
    }
  }
}