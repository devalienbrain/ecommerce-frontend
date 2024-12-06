import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cart") // Replace with your API endpoint
      .then((response) => setCartItems(response.data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const handleRemove = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/cart/${itemId}`) // Replace with your API endpoint
      .then(() => {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      })
      .catch((error) => console.error("Error removing item:", error));
  };

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Cart
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1 gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCart;
