import rootStore from '@vue-storefront/core/store'

export default product => {
  const sales = rootStore.state['centralized-catalog-sales'].sales
  const categories = product.category.map(v => v.category_id + "")
  let ps = null

  for(let cId of categories) {

    if(Object.keys(
      sales
    ).includes(cId)) {

      const spc = (product.priceInclTax * ((100 - sales[Number(cId)]) / 100))
      const withoutTax = spc * (product.price/product.priceInclTax)
      const tax = spc - withoutTax 

      ps = {
        ...product,
        price: withoutTax,
        priceInclTax: spc,
        priceTax: tax,
        special_price: product.priceInclTax,
        originalPriceInclTax: product.priceInclTax
      }

      break
    }
  }

  return ps || product
}