import React, { useEffect } from 'react'
import { Navbar } from "../../components/components";
import "./ProductListing.css";
import { ProductGrid } from './FilterSort/ProductGrid/ProductGrid';
import { filtersData, sortsData } from "./FilterSort/filterSortData";
import { FilterSortPanel } from './FilterSort/DesktopFilterSort/FilterSortPanel';
import { FilterSortBtn } from './FilterSort/FilterSortBtn/FilterSortBtn';

function ProductListing() {
  
  
  return (
    <>
      <Navbar
        menuRequired={false}
        navTxt={"Mens Style"}
        logoRemove={"logo-remove"}
      />
      <main>
        <div className="relative filter-product-wrapper">
          <FilterSortPanel 
          filtersData=
          // {[]}
          {filtersData} 
          sortsData=
          {sortsData}
           />
          <ProductGrid />
          
          <FilterSortBtn />
        </div>
      </main>
    </>

  )
}

export {ProductListing}