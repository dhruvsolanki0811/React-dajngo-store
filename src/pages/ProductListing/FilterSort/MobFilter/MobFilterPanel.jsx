import { IoChevronBack } from "../../../../icons/icons";
import "./MobFilterPanel.css";
import { Link } from "react-router-dom";
import {filtersData} from '../filterSortData';
import { useState } from "react";
import { isChecked } from "../utils";
import { useProductContext } from "../../../../context/ProductContext";

function MobFilterPanel() {
  const { productStates, dispatch } = useProductContext();
  const filterProperties = Object.keys(filtersData);
  const [selectedfilterProperty, setSelectedFilterProperty] = useState("brands");
  return (
    <div className="mob-filter-panel">
      <div className="flex mob-filter-header">
        <Link to="/shop">
          <IoChevronBack className="back-arrow icon" />
        </Link>
        <span className="filter-head txt-md">Filters</span>
      </div>
      <section className="flex mob-filter-content">
        <div className="mob-filter-properties">
          {filterProperties.map((property) => {
            return (
                <li key={property}  onClick={()=>setSelectedFilterProperty(property)} className="txt-md list-none filter-property">
                  {property}
                </li>
            );
          })}
        </div>
        <div className="mob-filter-items lt-bold">
            {filtersData[selectedfilterProperty].map(filterItem=>(
                <li key={filterItem} >
                    <label className="filter-item lt-bold txt-sm"> 
                    <input
                      checked={isChecked(selectedfilterProperty, filterItem,productStates)}
                      onChange={() =>
                        dispatch({
                          type: "FILTER",
                          payload: { property: selectedfilterProperty, selection: filterItem }
                        })
                      }
                      type="checkbox"
                    />
                      {filterItem}
                    </label>
                </li>
            ))}
        </div>
      </section>
      <div className="mob-filter-footer flex ">
        <Link to="/shop">
          <button onClick={()=> dispatch({ type: "CLEAR FILTER" })} className="plain-btn filter-cancel-btn">Cancel</button>
        </Link>
        <Link to="/shop">
          <button className="plain-btn filter-apply-btn">Apply</button>
        </Link>
      </div>
    </div>
  );
}
export { MobFilterPanel };