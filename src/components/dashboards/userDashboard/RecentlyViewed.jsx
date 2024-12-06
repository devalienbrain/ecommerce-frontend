import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recent-products") // Replace with your API endpoint
      .then((response) => setRecentProducts(response.data))
      .catch((error) =>
        console.error("Error fetching recent products:", error)
      );
  }, []);

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        Recently Viewed
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
