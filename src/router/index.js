import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.js';
import Category from '../pages/Category.js';
import Brands from '../pages/Brands.js';
import Details from '../pages/Details.js';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import Cart from '../pages/Cart.js';
import BrandListing from '../pages/BrandListing';
import Checkout from '../pages/Checkout';
import Success from '../pages/Success';
import Failed from '../pages/Failed';
import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import Wishlist from '../pages/Wishlist';
import CmsPage from '../pages/CmsPage';

function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/brands/:slug" element={<BrandListing />} />
      <Route path="/product/:slug" element={<Details />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/failed" element={<Failed />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/about-us" element={<CmsPage slug="about-us" />} />
      <Route path="/delivery-info" element={<CmsPage slug="delivery-info" />} />
      <Route path="/payment-policy" element={<CmsPage slug="payment-policy" />} />
      <Route path="/help-center" element={<CmsPage slug="help-center" />} />
      <Route path="/customer-care" element={<CmsPage slug="customer-care" />} />
      	
    </Routes>
  );
}

export default MyRouter;
