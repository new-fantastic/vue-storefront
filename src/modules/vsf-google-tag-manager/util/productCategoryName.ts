export default (product): string => {
    let categoryName = null

    for(let category of product.category) {
        if(category.category_id != 2) { // Not 'Wszystkie produkty'
            categoryName = category.name
        }
    }

    return categoryName
}