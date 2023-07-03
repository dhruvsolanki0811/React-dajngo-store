import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorageGetItem } from "../customHooks/customHooks";

const CartContext = createContext();

function CartProvider({ children }) {
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    const getCall = async () => {
      const userToken = localStorage.getItem("user-token");
      try {
        const response = await axios.get("https://shopruv.onrender.com/api/cart/", {
          headers: {
            authorization: "Bearer " + userToken,
          },
        });
        if (response.status === 200) {
         
          setCart(response.data.cart);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    getCall();
  }, []);

  async function addToCart(data, loadingState) {
    const userToken = localStorage.getItem("user-token");
    try {
      loadingState(true);
      const response = await axios.post(
        "https://shopruv.onrender.com/api/cart/create/",
        { items: data.slug },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      );
      if (response.status === 200) {
        loadingState(false);
        setCart(response.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function changeCartQuantity(quantityType, productID) {
    const userToken = localStorage.getItem("user-token");
    try {
      const response = await axios.post(
        `https://shopruv.onrender.com/api/cart/change/${productID}/`,
        {
          action: {
            type: quantityType,
          },
        },
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      );
      if (response.status === 200) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromCart(productID) {
    const userToken = localStorage.getItem("user-token");
    try {
      const response = await axios.delete(
        `https://shopruv.onrender.com/api/cart/delete/${productID}/`,
        {
          headers: {
            authorization: "Bearer " + userToken,
          },
        }
      );
      if (response.status === 200) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  }

const clearCart=async()=>{
  Cart.map((prod)=>removeFromCart(prod.slug))
}
  return (
    <CartContext.Provider
      value={{ Cart, setCart, addToCart, removeFromCart, changeCartQuantity ,clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => useContext(CartContext);

export { useCartContext, CartProvider };
