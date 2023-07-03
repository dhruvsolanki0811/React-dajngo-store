import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import {
  CartProvider,
  ProductProvider,
  WishlistProvider,
} from "./context/context";
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <WishlistProvider>
    <CartProvider>
    <AuthProvider>
    <ProductProvider>    
    <App />
    </ProductProvider>
    </AuthProvider>
    </CartProvider>
    </WishlistProvider>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
