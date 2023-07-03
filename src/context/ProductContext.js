import React from 'react'
import { createContext, useContext, useReducer ,useEffect} from "react";
import { productReducer } from "../Reducer/productReducer";
import {getProductsData} from "../serverCalls/getProductsData"
import { Loading } from '../components/components';

const ProductContext = createContext();

const contextInitialState = {
    sortBy: "",
    filterBy: { brand_name: [], 
        category: [],gender:[],
      size:[]},
    rating: 0,
    productsList: [],
}
function ProductProvider({children}) {
    const [productStates, dispatch] = useReducer(productReducer, contextInitialState)
    useEffect(() => {
        (async () => {
          try {
            dispatch({ type: "LOADER", payload: true });
            const InitialProductsData = await getProductsData();
            if (InitialProductsData) {
              dispatch({ type: "INITIAL PRODUCTS", payload: InitialProductsData });
              dispatch({ type: "LOADER", payload: false });
            }
          } catch (error) {
            console.log(error)
          }
        })();
      }, []);
      useEffect(() => {
      }, [productStates]);
  return (
    <ProductContext.Provider value={{ productStates, dispatch }}>
    {children}
</ProductContext.Provider>
  )
}

const useProductContext = () => useContext(ProductContext);

export { useProductContext, ProductProvider, contextInitialState };