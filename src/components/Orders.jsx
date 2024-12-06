import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders") // Replace with your API endpoint
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Orders
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">Order ID: {order.id}</h3>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            <p>Items: {order.items.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
