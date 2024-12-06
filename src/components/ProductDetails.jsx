import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../provider/UserContext";
import { IoArrowBackCircleOutline } from "react-icons/io5"; // React Icon for back button

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user?.id;

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Fetch product details when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });

    if (userId) {
      // Fetch cart items for the user
      axios
        .get(`http://localhost:5000/api/cart?userId=${userId}`)
        .then((response) => setCartItems(response.data))
        .catch((error) => console.error("Error fetching cart items:", error));
    }
  }, [productId, userId]);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // Add product to cart
    axios
      .post("http://localhost:5000/api/cart", {
        userId,
        productId: product.id,
        quantity: 1,
      })
      .then((response) => setCartItems([...cartItems, response.data]))
      .catch((error) => console.error("Error adding to cart:", error));
  };

  // Handle adding review
  const handleAddReview = () => {
    if (!userId) {
      alert("Please log in to leave a review.");
      return;
    }

    // Add review for the product
    axios
      .post("http://localhost:5000/api/reviews", {
        userId,
        productId: product.id,
        rating,
        comment: review,
      })
      .then(() => {
        setIsReviewSubmitted(true);
      })
      .catch((error) => console.error("Error adding review:", error));
  };

  if (!product) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-red-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="flex items-center text-blue-600 hover:underline text-lg lg:text-xl"
        >
          <IoArrowBackCircleOutline className="mr-2" size={24} />
          Back to Products
        </button>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row justify-between items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-1/2 h-64 lg:h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="ml-0 lg:ml-6 mt-4 lg:mt-0 w-full lg:w-1/2">
          <h1 className="text-3xl lg:text-4xl font-semibold">{product.name}</h1>
          <p className="text-lg lg:text-xl text-gray-700 mt-4">
            {product.description}
          </p>
          <p className="text-2xl lg:text-3xl font-semibold mt-4 text-gray-800">
            ${product.price}
          </p>

          <div className="mt-6 flex justify-start">
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-800">
          Leave a Review
        </h3>
        <div className="mt-4">
          <label className="block text-lg text-gray-700">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border px-4 py-2 rounded-md w-full lg:w-1/2 mt-2"
          />
        </div>
        <div>
          <label className="block mt-4 text-lg text-gray-700">Review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border px-4 py-2 rounded-md w-full lg:w-1/2 mt-2"
          />
        </div>
        <button
          onClick={handleAddReview}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-3xl mt-3 transition ease-in-out duration-300"
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

export default ProductDetails;
