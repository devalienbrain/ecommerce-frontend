import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserProvider } from "./provider/UserContext";
import Profile from "./components/dashboards/Profile";
import ManageUsers from "./components/dashboards/ManageUsers";
import ManageCategories from "./components/dashboards/ManageCategories";
import AddProduct from "./components/dashboards/AddProduct";
import VendorShop from "./components/dashboards/VendorShop";
import Orders from "./components/Orders";
import UserCart from "./components/dashboards/userDashboard/UserCart";
import UserReviews from "./components/dashboards/userDashboard/UserReviews";
import RecentlyViewed from "./components/dashboards/userDashboard/RecentlyViewed";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard route with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-categories" element={<ManageCategories />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="my-shop" element={<VendorShop />} />
            <Route path="orders" element={<Orders />} />
            <Route path="cart" element={<UserCart />} />
            <Route path="reviews" element={<UserReviews />} />
            <Route path="recent-products" element={<RecentlyViewed />} />
          </Route>
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
