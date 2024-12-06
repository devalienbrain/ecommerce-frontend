import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Title from "../components/shared/Title";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const onAddToCart = (productId) => {
    console.log(`Added product with ID: ${productId} to the cart`);
  };

  const onAddRecentlyViewed = (productId) => {
    console.log(`Added product with ID: ${productId} to recently viewed`);
  };
  const title = "Products";
  return (
    <>
      <div>
        <Title title={title} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddRecentlyViewed={onAddRecentlyViewed}
          />
        ))}
      </div>
    </>
  );
};

export default Products;
