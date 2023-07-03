import React from 'react'
import { Routes, Route } from "react-router-dom";
import { HomePage,ErrorPage,ProductListing, ProductDetailPage, AuthSignUp, AuthLogin, Order, UserOrders} from './pages/pages'

import { RequireAuth } from "./pages/AuthenticationPage/AuthRoutes/require-auth";
import { RestrictAuth } from "./pages/AuthenticationPage/AuthRoutes/restrict-auth";
import { Cart } from './pages/Cart/Cart';
import { Wishlist } from './pages/Wishlist/Wishlist';


function RoutesPath() {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />}></Route>
            <Route path="shop" element={<ProductListing />} />
            <Route path="/shop/:productID" element={<ProductDetailPage />} />
            <Route element={<RestrictAuth />}>
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/signup" element={<AuthSignUp />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path='/order' element={<Order/>}/>
        {/* <Route path='/user/orders' element={<UserOrders/>}/> */}
      </Route>
        </Routes>
    </>)
}

export {RoutesPath}