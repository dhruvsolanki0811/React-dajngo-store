function productReducer(state, { type, payload }) {
  switch (type) {
    case "USERSIGNED": {
      return { ...state, userID: payload }
    }
    case "INITIAL PRODUCTS": {
      const mate= {
        ...state,
        productsList: [...payload],
      }
      return mate
      
    }
    case "SORT": {
      return { ...state, sortBy: payload };
    }
    case "FILTER": {
      
      let newFilterProperty = state.filterBy[payload.property];
      const filterState = state.filterBy;
      const selectedFilter = payload.selection;
      if (filterState[payload.property].includes(selectedFilter)) {
        newFilterProperty = newFilterProperty.filter(
          (item) => item !== selectedFilter
        );
      } else {
        newFilterProperty = newFilterProperty.concat(selectedFilter);
      }
      const ans={
        ...state,
        filterBy: {
          ...state.filterBy,
          [payload.property]: newFilterProperty
        }
      };
      return ans
    }
    case "RATING": {
      return { ...state, rating: payload };
    }
    case "CLEAR FILTER": {
      return {
        ...state, sortBy: "",
        filterBy: { brands: [], color: [] },
        rating: 5,
      }
    }

    default:
      return state;
  }
}
export { productReducer };