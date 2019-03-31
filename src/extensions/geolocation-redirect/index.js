/* eslint-disable */
import axios from "axios"
const EXTENSION_KEY = 'geolocation-redirect'

// Transforms country code in stanadard ISO 3166-1 alpha-2 to prefix
// If not found, returns defaultCountry
const defaultCountry = 'pln';
const countryCodeToPrefix = (countryCode) => {
  const codes = {
    GB: 'gbp',
    US: 'usd',
    AT: 'eur', // Countries with euro as currency
    BE: 'eur',
    CY: 'eur',
    EE: 'eur',
    FI: 'eur',
    FR: 'eur',
    DE: 'eur',
    GR: 'eur',
    IE: 'eur',
    IT: 'eur',
    LV: 'eur',
    LT: 'eur',
    LU: 'eur',
    MT: 'eur',
    NL: 'eur',
    PT: 'eur',
    SK: 'eur',
    SI: 'eur',
    ES: 'eur'
  };

  return codes[countryCode] ? codes[countryCode] : defaultCountry;
};

export default function (app, router, store, config, root, state) {
  router.beforeEach(async (to, from, next) => {
    // pln-home, usd-home, gbp-home

    if(!(to.name.match(/[a-z]{3}-/) && to.name.substr(0, 3) === to.path.substr(1, 3))) {
      // // Lets find a country
      let prefix;
      try {
        // Limit is 50 per minute
        let { data } = await axios.get("https://extreme-ip-lookup.com/json/");
        prefix = countryCodeToPrefix(data.countryCode)
      } catch(e) {
        prefix = countryCodeToPrefix()
      }
      

      if(to.name.substr(0, 3) === prefix) {
        next()
      } else {
        //shop/carts/current-cart
        const tmpRoute = Object.assign({}, to);
        if(prefix === 'pln') {
          next()
        } else {
          next(localizedRoute(tmpRoute, prefix))
        }
        
        //next()
        // try {
        //   // Okay, I have access to window, I'm in user's browser
        //   const newPath = `${window.location.origin}/${prefix}${window.location.pathname}`
        //   window.location.replace(newPath)
        // } catch(e) {
        //   // I am on server, nothing to do
        // }
      }
      
    } else {
      next();
    }
    next()
  })

  return {
    EXTENSION_KEY
  }
}
