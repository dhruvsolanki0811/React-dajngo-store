import { navItems } from "../navItems";
import "./Navbar.css";
import "./Navbar-media.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../components";
import { logoImg } from "../../assets/images.js";
import {
  FaShoppingCart,
  BiSearch,
  FaHeart,
  AiFillCloseCircle,
  FaUserAlt,
  IoChevronBack,
} from "../../icons/icons";
import { useCartContext, useWishlistContext, useAuthContext } from "../../context/context";

const Navbar = ({ menuRequired=false, navTxt, logoRemove }) => {
  const { userState, logoutUser } = useAuthContext(); 
  const { Cart } = useCartContext();
  const { Wishlist  } = useWishlistContext();
  const navigate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [DropDown, setDropDown] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const showSidebar = () => setSideBar((sideBar) => !sideBar);
  return (
    <>
      <section className="flex nav-section">
        {menuRequired && (
          <div onClick={showSidebar} className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {navTxt && (
          <div className="nav-icon-grp lt-bold">
            <IoChevronBack
              onClick={() => navigate("/")}
              className="back-arrow icon size-xs"
            />
            <span className="nav-txt">{navTxt}</span>
          </div>
        )}
        <div className="flex h-100 logo-container">
          <Link to="/">
            <img
              src={logoImg}
              alt="logo"
              className={`logoImg flex ${logoRemove}`}
            />
          </Link>
        </div>
        <nav className="w-100 h-100 navbar">
          <ul className="list-none flex nav-link-container">
            {navItems.map((navItem) => {
              return (
                <li key={navItem.id} className="nav-content lt-bold">
                  <Link className="nav-link" to={navItem.url}>
                    {navItem.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex nav-icon-container">
            {/* <div className="flex search-container ">
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
              />
              <div className="search-icon-container">
                <BiSearch className="search-btn" />
              </div>
            </div> */}
{/* 
            {showSearchModal && (
          <div className="search-bar-modal">
            <div className="search-bar">
              <div className="search-bar-heading flex ">
                <span>What are you looking for?</span>
                <AiFillCloseCircle
                  onClick={() => setShowSearchModal(false)}
                  className="icon size-xs"
                />
              </div>
              <form className="search-bar-center flex">
                <input placeholder="Search Here" />
                <BiSearch className="mobile-search-btn icon size-xs" />
              </form>
            </div>
          </div>
        )} */}
        {/* <BiSearch
            onClick={() => setShowSearchModal(true)}
            className="mobile-search-btn icon size-xs"
          /> */}
            <div
              onClick={() => setDropDown((prev) => !prev)}
              className="flex pointer user-icon-box relative icon-container" >
              <FaUserAlt className="user-icon icon" />
              <span className="icon-txt">Profile</span>
              {DropDown && (
                <div className="absoloute inset-0 profile-box">
                  {userState.id && (
                    <>
                    {/* <Link to="/user/orders" >
                    <button 
                    onClick={()=>{ navigate("/user/orders")}}
                    className="w-100 btn btn-xs"
                    >
                    MyOrders
                  </button>
                    </Link> */}
                    <Link to="/login" >
                    <button
                    onClick={()=>{logoutUser(); navigate("/")}}
                    className="w-100 btn btn-xs"
                    >
                    LogOut
                  </button>
                    </Link>
                    </>
                  )}
                  {!userState.id && (
                    <button
                      onClick={() => navigate("/login")}
                      className="w-100 btn btn-xs"
                    >
                      Login/SignUp
                    </button>
                  )}
                </div>
              )}
            </div>

            <div
              onClick={() => navigate("/wishlist")}
              className="flex pointer relative icon-container"
            >
              <FaHeart className="wishlist-icon icon " />
              {Wishlist.length > 0 && (
                <span className="flex number-badge">{Wishlist.length}</span>
              )}
              <span className="icon-txt">Wishlist</span>
            </div>

            <div
              onClick={() => navigate("/cart")}
              className="flex pointer relative icon-container"
            >
              <FaShoppingCart className="cart-icon icon " />
              {Cart.length > 0 && (
                <span className="flex number-badge">{Cart.length}</span>
              )}
              <span className="icon-txt">Cart</span>
            </div>
          </div>
        </nav>
      </section>
      {sideBar && <Sidebar />}
    </>
  );
};
export { Navbar };
