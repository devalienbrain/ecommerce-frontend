import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";
import { useUser } from "../provider/UserContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const { user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    // Fetch all products
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));

    // Fetch cart items for the user
    axios
      .get(`http://localhost:5000/api/cart?userId=${userId}`)
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error(error));

    // Fetch recently viewed products
    axios
      .get(`http://localhost:5000/api/recently-viewed?userId=${userId}`)
      .then((response) => setRecentlyViewed(response.data))
      .catch((error) => console.error(error));
  }, [userId]);

  // Add product to the cart
  const handleAddToCart = (productId) => {
    axios
      .post("http://localhost:5000/api/cart", {
        userId,
        productId,
        quantity: 1,
      })
      .then((response) => setCartItems([...cartItems, response.data]))
      .catch((error) => console.error(error));
  };

  // Add product to the recently viewed list
  const handleAddRecentlyViewed = (productId) => {
    axios
      .post("http://localhost:5000/api/recently-viewed", { userId, productId })
      .then((response) => setRecentlyViewed([...recentlyViewed, response.data]))
      .catch((error) => console.error(error));
  };

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <div>
        <Banner />
      </div>
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        Available Products
      </h1>
      <hr className="mb-7" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddRecentlyViewed={handleAddRecentlyViewed}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
