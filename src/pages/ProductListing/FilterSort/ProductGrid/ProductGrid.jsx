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

  let loadings = "Free Render backend might take some time";
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
  console.log(productStates.filterBy)



  if(productStates.filterBy.brand_name.length>0 || productStates.filterBy.category.length>0 || productStates.filterBy.gender.length>0 || productStates.filterBy.size.length>0){
    loadings="No such products!sorry"
  }else{
    loadings="Free Render backend might take some time"
  }
  }, [productStates])
  
  return (
    <>
      <section className="product-list-container">
      {sortedProducts.length==0 && loadings}
      
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