import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../provider/UserContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return; // Prevent unnecessary API calls if user ID is unavailable

    axios
      .get(`http://localhost:5000/api/orders?userId=${user?.id}`)
      .then((response) => setOrders(response?.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [user?.id]);

  return (
    <div className="px-6 py-4 w-full lg:w-3/4 mx-auto my-6 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-black text-center mb-5">
        My Orders
      </h1>
      <hr className="mb-7" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders?.length > 0 ? (
          orders?.map((order) => (
            <div key={order?.id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">Order ID: {order?.id}</h3>
              <p>Total: ${order?.total?.toFixed(2)}</p>
              <p>Status: {order?.status}</p>
              <p>Items: {order?.items?.length || 0}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
