import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorageGetItem } from "../customHooks/customHooks";

const WishlistContext = createContext();
function WishlistProvider({ children }) {
  const [Wishlist, setWishlist] = useState([]);


  useEffect(() => {
    const getCall = async () => {
      const userToken = localStorage.getItem("user-token");
      try {
        const response = await axios.get("https://shopruv.onrender.com/api/wishlist/", {
          headers: {
            authorization: "Bearer " + userToken,
          },
        });
        if (response.status === 200) {
         
          setWishlist(response.data.wishlist);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    getCall();
  }, []);

  async function addToWishlist(data, loader = null) {
    const userToken = localStorage.getItem("user-token");
    try {
      loader && loader(true);
      const response = await axios.post(
        "https://shopruv.onrender.com/api/wishlist/create/",
        { items: data.slug },
        {
          headers: {
            authorization: 'Bearer '+userToken,
          },
        }
      );
      if (response.status === 200) {
        setWishlist(response.data.wishlist);
        loader && loader(false);
      }
    } catch (error) {
      console.log("error is ", error);
    }
  }

  async function removeFromWishlist(productID, showLoader) {
    const userToken = localStorage.getItem("user-token");
    try {
      showLoader(true);
      const response = await axios.delete(`https://shopruv.onrender.com/api/wishlist/delete/${productID}/`, {
        headers: {
          authorization: 'Bearer '+userToken,
        },
      });
      if (response.status === 200) {
        showLoader(false);
        setWishlist(response.data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <WishlistContext.Provider
      value={{ Wishlist, setWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

const useWishlistContext = () => useContext(WishlistContext);
export { useWishlistContext, WishlistProvider };