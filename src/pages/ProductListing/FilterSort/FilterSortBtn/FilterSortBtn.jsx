import "./FilterSortBtn.css";
import { useNavigate} from "react-router-dom";

import { useState } from "react";
import { MobSort } from "../../../pages";
function FilterSortBtn() {
  const navigate = useNavigate();
  const [showMobSort, setShowMobSort] = useState(false);
  return (
    <div className="flex relative w-100 filter-sort-btns">
      <button
        onClick={() => setShowMobSort((prev) => !prev)}
        className="btn plain-btn sort-btn"
      >
        SORT
      </button>
        <button onClick={()=>navigate("/filter")} className="btn plain-btn filter-btn">FILTER</button>
      {showMobSort && <MobSort setShowMobSort={setShowMobSort} />}
    </div>
  );
}
export { FilterSortBtn };