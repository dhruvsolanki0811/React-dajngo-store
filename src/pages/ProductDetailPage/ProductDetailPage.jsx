import { Navbar, Loading } from "../../components/components";
import { AiFillStar, FaHeart, FaArrowRight } from "../../icons/icons";
import "./ProductDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  useCartContext,
//   useWishlistContext,
  useProductContext,
  useAuthContext,
} from "../../context/context";
import { isPresentInState } from "../../components/utils";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { Cart, addToCart } = useCartContext();
  const { userState } = useAuthContext();
//   const { Wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();
  const [wishlistLoading, showWishlistLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { productStates } = useProductContext();
  const { productID } = useParams();
  const productDetailCard = productStates.productsList?.find(
    (currProduct) => currProduct.slug=== productID
    );
  
  return (
    <>
      <Navbar menuRequired={false} navTxt={"Back"} logoRemove={"logo-remove"} />
      <section className="product-main-container">
        <div className="w-100 h-100 flex product-container">
          <div className="product-detail-img-container">
            <img
            loading="lazy"
              className="w-100 "
              src={productDetailCard?.image}
              alt={productDetailCard?.id}
            />
          </div>
          <div className="h-100 product-details-container">
            <span className="product-title lt-bold txt-md">
              {productDetailCard?.name}
            </span>
            <p className="product-info lt-bold txt-sm">
              {/* {productDetailCard?.description} */}
            </p>
            <div className="flex product-rating-box">
              <div className="product-rating">
                <span className="flex txt-sm">
                { productDetailCard?.avg_rating}
                  <AiFillStar className="size-xs icon" />
                </span>
              </div>
              <div className="product-rating-txt">{ productDetailCard?.number_rating} Ratings</div>
            </div>
            <div className="product-price-container">
              <span
                className="product-price
                          txt-md lt-bold"
              >
                ₹{productDetailCard?.price}
              </span>
              {/* <span className="strike-txt txt-sm product-og-price ">
                ₹{productDetailCard?.productOgPrice}    
              </span> */}
              <p className="product-price-msg txt-xs">Inclusive of all taxes</p>
            </div>
            <div className="flex text-center product-size-btn-container">
              {/* <button className="btn btn-sm size-btn ">S</button>
              <button className="btn btn-sm size-btn ">M</button>
              <button className="btn btn-sm size-btn ">L</button>
              <button className="btn btn-sm size-btn ">XL</button>
              <button className="btn btn-sm size-btn ">2XL</button> */}
            <button className="btn btn-sm size-btn ">{productDetailCard?.size}</button>
            </div>
            <div className="flex cta-btn-container">
              {userState.id
               ? (
                isPresentInState(productDetailCard, Cart) 
                ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="btn btn-sm cart-btn"
                  >
                    Go to Cart <FaArrowRight className="icon size-xs" />
                  </button>
                ) : (
                  <button
                    disabled={addingToCart}
                    className="btn btn-sm cart-btn"
                    onClick={() =>
                      addToCart(productDetailCard, setAddingToCart)
                    }
                  >
                    {addingToCart ? (
                      <Loading width="20px" height="20px" />
                    ) : (
                      `ADD TO CART`
                    )}
                  </button>
                )
              ) : (
                <button onClick={() => navigate("/login")}
                 className="btn btn-sm cart-btn">ADD TO CART</button>
              )}

              {userState.id
               ? (
                // isPresentInState(productDetailCard, Wishlist) 
                false?
                 (
                  <button
                    // disabled={wishlistLoading}
                    // onClick={() =>
                    //   removeFromWishlist(
                    //     productDetailCard?._id,
                    //     showWishlistLoading
                    //   )
                    // }
                    className="add-wishlist-btn"
                  >
                    {/* {wishlistLoading */}
                    {false ? (
                      <Loading width="20px" height="20px" />
                    ) : (
                      <FaHeart className="icon size-xs present-already" />
                    )}
                  </button>
                ) : (
                  <button
                    // disabled={wishlistLoading}
                    // onClick={() =>
                    // //   addToWishlist(productDetailCard, showWishlistLoading)
                    // }
                    className="add-wishlist-btn"
                  >
                    {/* {wishlistLoading  */}
                    {false ? (
                      <Loading width="20px" height="20px" />
                    ) : (
                      <FaHeart className="icon size-xs " />
                    )}
                  </button>
                )
              ) : (
                <button onClick={() => navigate("/login")} className="add-wishlist-btn">
                  {" "}
                  <FaHeart className="icon size-xs" />
                </button>
              )}
            </div>
            <div className="product-description-box">
              <li className=" description-heading lt-bold txt-sm">
                Product Details
              </li>
              <p className="product-detail-description txt-sm">
                {productDetailCard?.description}
              </p>
            </div>
            <li className=" description-heading lt-bold txt-sm">
              Material and Care
            </li>
            <div className="product-detail-description txt-sm">
              <p>Cotton Machine Wash</p>
              <p>Handle with care</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export { ProductDetailPage };
