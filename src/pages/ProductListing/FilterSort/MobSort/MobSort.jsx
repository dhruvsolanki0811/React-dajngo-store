import { sortsData } from "../filterSortData";
import { IoChevronBack } from "../../../../icons/icons";
import "./MobSort.css";
import { useProductContext } from "../../../../context/ProductContext";

function MobSort({ setShowMobSort }) {
  const { dispatch } = useProductContext();
  return (
    <div className="w-100 h-100  sort-overlay">
      <div className=" w-100 mob-sort-container">
        <p className="flex mob-sort-heading">
          <IoChevronBack
            onClick={() => setShowMobSort(false)}
            className="back-arrow icon"
          />
          SORT BY
        </p>
        <div className="divider">"</div>
        {sortsData.map((sortItem) => (
          <p
            className="txt-sm mob-sort-items"
            key={sortItem}
            onClick={() => {
              dispatch({ type: "SORT", payload: sortItem });
              setShowMobSort(false);
            }}
          >
            {sortItem}
          </p>
        ))}
      </div>
    </div>
  );
}
export { MobSort };