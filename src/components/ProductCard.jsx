import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../provider/UserContext";

const ProductCard = ({ product, onAddToCart, onAddRecentlyViewed }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  const handleAddReview = () => {
    axios
      .post("http://localhost:5000/api/reviews", {
        userId,
        productId: product?.id,
        rating,
        comment: review,
      })
      .then((response) => {
        setIsReviewSubmitted(true);
      })
      .catch((error) => console.error("Error adding review", error));
  };

  const handleViewDetails = () => {
    // Redirect to product detail page, or implement product detail modal
    console.log(`Viewing details for product ${product?.name}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product?.image || "default-image.jpg"}
        alt={product?.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{product?.name}</h2>
      <p className="text-lg text-gray-700">Price: ${product?.price}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => {
            onAddToCart(product?.id);
            onAddRecentlyViewed(product?.id);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Add to Cart
        </button>
        <button onClick={handleViewDetails} className="ml-3 text-blue-500">
          View Details
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Leave a Review:</h3>
        <div>
          <label className="block">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border px-2 py-1 rounded-md"
          />
        </div>
        <div>
          <label className="block mt-2">Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border px-2 py-1 rounded-md w-full"
          />
        </div>
        <button
          onClick={handleAddReview}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-3xl mt-3"
        >
          Submit Review
        </button>
        {isReviewSubmitted && (
          <p className="text-green-500 mt-2">Review submitted successfully!</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
