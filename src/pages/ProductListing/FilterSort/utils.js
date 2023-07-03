function isChecked(property, listItem, productStates) {
    
    return productStates.filterBy[property].includes(listItem);
}
const getDynamicPriceRange = (productData) => {
    return productData.reduce(
        (priceRange, productCard) => {
            return [
                Math.min(productCard.price, priceRange[0]),
                Math.max(productCard.price, priceRange[1])
            ];
        },
        [Number.MAX_SAFE_INTEGER, 0]
    );
};
export { isChecked, getDynamicPriceRange }