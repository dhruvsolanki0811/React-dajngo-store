import React, { useEffect, useState } from 'react'
import "./ProductGrid.css";
import "./ProductGridMedia.css";
import { ProductCard } from "../../../../components/components";
import {
    getFilteredData,
    getRatingsData,
    getSortedData,
  } from "../../filterOperation";
  import { useProductContext } from "../../../../context/ProductContext";
  import { filtersData } from "../filterSortData";

  const loadings = "loading";
// import {
//      getFilteredData,
//     getRatingsData,
//     getSortedData,
//   } from "../filterOperation";


function ProductGrid() {

  const { productStates } = useProductContext();
  const [sortedProducts, setsortedProducts] = useState([])
  useEffect(() => {
  const filteredProductsData = getFilteredData(productStates, filtersData);
  const ratingsData = getRatingsData(
    filteredProductsData,
    productStates.rating    
  );
  const sortedProducts = getSortedData(ratingsData, productStates.sortBy);
    setsortedProducts(sortedProducts)
  }, [productStates])
  
  return (
    <>
      <section className="product-list-container">
      {sortedProducts.loader && loadings}
      
      {/* {false && loadings} */}
      { sortedProducts.map((card) => (
        <ProductCard
          key={card.id}
          productCardDetails={card}
          btnTxt={"Add to Cart"}
        />
        
      ))}
      
      
    </section>
    </>
    )
}

export {ProductGrid}