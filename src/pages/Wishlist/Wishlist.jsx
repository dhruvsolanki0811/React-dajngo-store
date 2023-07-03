import { Navbar, ProductCard } from "../../components/components";
import { useWishlistContext } from "../../context/context";
import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const { Wishlist } = useWishlistContext();
  return (
    <>
      <Navbar
        isMenuRequired={false}
        navTxt={"Wishlist"}
        logoRemove={"logo-remove"}
      />
      <section className="wishlist-product-list-container">
        {Wishlist.map((card) => (
          <ProductCard
            key={card.id}
            productCardDetails={card}
            btnTxt={"Move To Bag"}
            productCardIcon={"TRASH"}
          />
        ))}
        {Wishlist.length === 0 && (
          <div className="flex empty-page-box" >
            <h1 className="empty-page-title" >YOUR WISHLIST IS EMPTY !</h1>
            <img className="flex empty-page-image" src="https://images.bewakoof.com/web/group-3x-1509961969.png" alt="empty wishlist" />
            <Link to="/shop">
            <button className="btn btn-sm outline ">View Products</button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export { Wishlist };
