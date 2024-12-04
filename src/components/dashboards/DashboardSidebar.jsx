import { Link } from "react-router-dom";

const DashboardSidebar = ({ role }: { role: "admin" | "vendor" | "user" }) => {
  return (
    <div className="h-full bg-white pl-6 py-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Dashboard</h2>
      <ul className="space-y-4">
        {/* Common Links */}
        <li>
          <Link
            to="/dashboard/profile"
            className="block text-gray-600 hover:text-blue-500 hover:underline"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/orders"
            className="block text-gray-600 hover:text-blue-500 hover:underline"
          >
            Orders
          </Link>
        </li>
        {role === "admin" && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              Admin Links
            </h3>
            <li>
              <Link
                to="/dashboard/manage-users"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-categories"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                Manage Categories
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/monitor-transactions"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                Monitor Transactions
              </Link>
            </li>
          </>
        )}
        {role === "vendor" && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              Vendor Links
            </h3>
            <li>
              <Link
                to="/dashboard/my-shop"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                My Shop
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-product"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-inventory"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                Manage Inventory
              </Link>
            </li>
          </>
        )}
        {role === "user" && (
          <>
            <h3 className="text-lg font-semibold text-gray-700 mt-6">
              User Links
            </h3>
            <li>
              <Link
                to="/dashboard/cart"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                My Cart
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/recent-products"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                Recently Viewed
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/reviews"
                className="block text-gray-600 hover:text-blue-500 hover:underline"
              >
                My Reviews
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
