import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../provider/UserContext";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/cart?userId=${userId}`)
        .then((response) => setCartItems(response?.data || []))
        .catch((error) =>
          console.error("Error fetching cart items for user:", error)
        );
    }
  }, [userId]);
  console.log(cartItems);
  const handleRemove = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/cart/${itemId}`)
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item?.id !== itemId)
        );
      })
      .catch((error) => console.error("Error removing item from cart:", error));
  };

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Cart
      </h1>
      <hr className="mb-7" />
      {cartItems?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cartItems?.map((item) => (
            <div
              key={item?.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{item?.product?.name}</h3>
                <p>Price: ${item?.product?.price}</p>
                <p>Quantity: {item?.quantity}</p>
              </div>
              <button
                onClick={() => handleRemove(item?.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                aria-label={`Remove ${item?.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCart;
