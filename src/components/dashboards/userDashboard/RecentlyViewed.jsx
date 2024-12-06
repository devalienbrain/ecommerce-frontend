import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../provider/UserContext";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/recently-viewed?userId=${userId}`)
        .then((response) => setRecentProducts(response?.data || []))
        .catch((error) =>
          console.error("Error fetching recently viewed products:", error)
        );
    }
  }, [userId]);
  console.log(recentProducts);
  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        Recently Viewed
      </h1>
      <hr className="mb-7" />
      {recentProducts?.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't viewed any products recently.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {recentProducts?.map((product) => (
            <div
              key={product?.id}
              className="border p-4 rounded shadow hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="font-bold">{product?.product?.name}</h3>
              <p>Price: ${product?.product?.price}</p>
              <p>Viewed At: {product?.viewedAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
