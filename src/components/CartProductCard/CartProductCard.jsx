import { useState } from "react";
import { useCartContext, useWishlistContext } from "../../context/context";
import "./CartProductCard.css";
import {isPresentInState} from '../utils'
function CartProductCard({ productCard }) {
  const { removeFromCart, changeCartQuantity } = useCartContext();
  const { Wishlist, addToWishlist } = useWishlistContext();
  const [moveLoader, setMoveLoader] = useState(false);

    const callWishlistAndCart = (data) => {

      // isPresentInState(data, Wishlist) ? addToWishlist(data, setMoveLoader) : null;
      if (isPresentInState(data,Wishlist)){
        addToWishlist(data, setMoveLoader)
      }
      removeFromCart(data.slug);
    };

  const productPriceSaving =productCard.price 
  
  
    return (
      <>
    <div className="border-radius cart-product-box">
      <div className="flex cart-product-content">
        <div className="cart-product-details">
          <div className="cart-product-description">
            <div className="txt-sm card-product-title lt-bold">
              {productCard.name}
            </div>
            <p>{productCard.descritpion}</p>
          </div>
          <span className="cart-product-price lt-bold txt-md">
            ₹{productCard.price}
          </span>
          <span className="cart-og-price strike-txt txt-sm">
            ₹{productCard.price}
          </span>
          <div className="txt-sm lt-bold cart-product-msg">
            You saved ₹{productCard.price}!
          </div>
          <div className="flex cart-product-options">
            <select name="select-size" className="select-size">
              <option className="selected-size">{productCard.size}</option>
              {/* <option>Size: SM</option>
              <option>Size: MD</option>
              <option>Size: LG</option>
              <option>Size: XL</option>
              <option>Size: XXL</option> */}
            </select>
            <div className="flex cart-product-quantity">
              <button
                onClick={() => changeCartQuantity("decrement", productCard.slug)}
                className="qty-btn flex "
              >
                -
              </button>
              <div className="qty-value">{productCard.quantity  }</div>
              <button
                onClick={() => changeCartQuantity("increment", productCard.slug)}
                className="qty-btn flex "
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="cart-product-image">
          <img
            className="w-100"
            src={productCard.image}
            alt={productCard.id}
          />
        </div>
      </div>
      <div className="cart-btn-container txt-center">
        <button
          onClick={() => removeFromCart(productCard.slug)}
          className=" btn btn-sm "
        >
          Remove
        </button>
        {/* <button
          disabled={moveLoader}
          onClick={() => callWishlistAndCart(productCard)}
          className=" btn btn-sm "
        >
          Move to Wishlist
        </button> */}
      </div>
    </div>
    </>);
}

export { CartProductCard };