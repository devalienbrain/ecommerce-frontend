import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useUser } from "../../provider/UserContext";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  // Use a fallback value if `state` or `totalPrice` is missing
  const totalPrice = state?.totalPrice || 0;

  const handlePayment = () => {
    // Implement your payment logic with SSLCommerz here
    alert("Payment initiated!");
  };

  return (
    <div className="p-6 w-full lg:w-2/3 mx-auto my-6 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FiArrowLeft className="mr-2 text-2xl" />
        Go Back
      </button>

      <h1 className="text-2xl md:text-4xl font-bold mb-5">Checkout</h1>
      <div className="border p-6 rounded shadow">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">User ID</label>
          <input
            type="text"
            value={user?.id || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Address</label>
          <textarea
            placeholder="Enter your address"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Amount to Pay</label>
          <input
            type="text"
            value={`$${totalPrice.toFixed(2)}`}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Pay with SSLCommerz
        </button>
      </div>
    </div>
  );
};

export default Checkout;
