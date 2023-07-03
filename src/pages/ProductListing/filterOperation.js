function getSortedData(productData, state) {
    if (state === "") {
        return productData;
    }
    return [...productData].sort((a, b) =>
        state === "low to high"
            ? a.price - b.price
            : b.price - a.price
    );
}

function filterByEachCategory(products, category, filterBy) {
    return products.filter((product) => {
        if (!filterBy[category].length) {
            return true;
        }
        return filterBy[category].includes(product[category]);
    });
}

function getFilteredData(state, filterObj) {
    return Object.keys(filterObj).reduce((filteredProducts, category) => {
        return filterByEachCategory(filteredProducts, category, state.filterBy);
    }, state.productsList);
}

function getRatingsData(products, ratingState) {
    if (ratingState === 0) {
        return products
    }
    return products.filter((product) => product.avg_rating <= ratingState);
    
}
export { getSortedData, getFilteredData, getRatingsData };
