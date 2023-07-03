import { useProductContext } from "../../../../context/ProductContext"
import { isChecked, getDynamicPriceRange } from "../utils";
import "./FilterSortPanel.css";

function FilterSortPanel({ filtersData, sortsData }) {
    const { productStates, dispatch } = useProductContext();
    return (
      <section className=" side-filter-container sticky">
        <div className="side-filter">
          <p className="filter-heading txt-md">Filters</p>
          <div className="filter-category-container">
  
            {Object.keys(filtersData).map((property) => {
              return (
                <div key={property}>
                  <p className="lt-bold txt-sm">{property=='brand_name'?'BRAND':property.toUpperCase()}</p>
                  {filtersData[property].map((filterItem) => (
                    <label
                      key={filterItem}
                      className="lt-bold txt-xs flex filter-item"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked(property, filterItem, productStates)}
                        name="bydefault"
                        value={filterItem}
                        onChange={() =>
                          dispatch({
                            type: "FILTER",
                            payload: {
                              property: property,
                              selection: filterItem,
                            },
                          })
                        }
                        className="p-1 checkbox pointer"
                      />
                      <span className="txt-sm filter-item-txt">{filterItem}</span>
                    </label>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="filter-heading txt-md">Sort</div>
  
          <div className="sort-container">
            {sortsData.map((sortItem) => (
              <label key={sortItem} className="lt-bold filter-item flex">
                <input
                  type="radio"
                  className="radio-inp"
                  checked={productStates.sortBy && productStates.sortBy === `${sortItem}`}
                  name="sort"
                  onChange={() => dispatch({ type: "SORT", payload: sortItem })}
                />
                <span className="txt-sm">{sortItem}</span>
              </label>
            ))}
          </div>
  
          <div className="filter-heading txt-md">Rating</div>
          <div className="flex filter-item slider-container">
            <input
              type="range"
              min={1}
              max={5}
              defaultValue={5}
              onChange={(e) =>
                dispatch({ type: "RATING", payload: e.target.value })
              }
            />
          </div>
          <button
            onClick={() => dispatch({ type: "CLEAR FILTER" })}
            className="btn btn-sm clear-btn"
          >
            Clear Filters
          </button>
        </div>
      </section>
    );
  }
  
  export { FilterSortPanel };