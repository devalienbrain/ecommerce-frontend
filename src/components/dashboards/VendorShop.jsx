import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useUser } from "../../provider/UserContext";

const VendorShop = () => {
  const { user } = useUser();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const userId = user?.id;
  console.log(userId);

  // Fetch shops
  useEffect(() => {
    const fetchShops = async () => {
        if (!userId) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/shop`, {
                params: { userId },
            });
            console.log("API Response:", response.data);
            setShops(Array.isArray(response?.data) ? response?.data : []);
        } catch (error) {
            console.error("Error fetching shops:", error);
            setShops([]); // Ensure shops is always an array
        }
    };

    fetchShops();
}, [userId]);

  console.log(shops);
  // Handle creating or updating a shop
  const handleSaveShop = async () => {
    if (!name.trim() || !description.trim()) {
      return alert("Shop name and description cannot be empty");
    }

    const shopData = { name, logo, description, userId };

    try {
      if (selectedShop) {
        // Update shop
        const response = await axios.put(
          `http://localhost:5000/api/shop/${selectedShop.id}`,
          shopData
        );
        setShops((prev) =>
          prev?.map((shop) =>
            shop.id === selectedShop.id ? response.data : shop
          )
        );
        alert("Shop updated successfully!");
      } else {
        // Create shop
        const response = await axios.post(
          "http://localhost:5000/api/shop",
          shopData
        );
        setShops((prev) => [...prev, response.data]);
        alert("Shop created successfully!");
      }

      closeModals();
    } catch (error) {
      console.error("Error saving shop:", error);
      alert("Failed to save shop. Please try again.");
    }
  };

  // Handle deleting a shop
  const handleDeleteShop = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/shop/${selectedShop.id}`);
      setShops((prev) => prev.filter((shop) => shop.id !== selectedShop.id));
      alert("Shop deleted successfully!");
      closeModals();
    } catch (error) {
      console.error("Error deleting shop:", error);
      alert("Failed to delete shop. Please try again.");
    }
  };

  // Close all modals  g
  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedShop(null);
    setName("");
    setLogo("");
    setDescription("");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Shops</h2>

      {/* Create Shop Button */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center mb-4"
      >
        <MdAdd className="mr-2" /> Create Shop
      </button>

      {/* Shops Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">#</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Logo</th>
            <th className="border border-gray-200 px-4 py-2">Description</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops?.map((shop, index) => (
            <tr key={shop?.id}>
              <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">{shop?.name}</td>
              <td className="border border-gray-200 px-4 py-2">
                {shop?.logo && (
                  <img src={shop?.logo} alt="Logo" className="w-16 h-16" />
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {shop?.description}
              </td>
              <td className="border border-gray-200 px-4 py-2 flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedShop(shop);
                    setName(shop?.name);
                    setLogo(shop?.logo);
                    setDescription(shop?.description);
                    setIsUpdateModalOpen(true);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <AiFillEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedShop(shop);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <AiFillDelete className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create/Update Modal */}
      {(isCreateModalOpen || isUpdateModalOpen) && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              {selectedShop ? "Update Shop" : "Create Shop"}
            </h3>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Shop Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
                placeholder="Enter shop name"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Shop Logo URL</label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="border p-2 w-full"
                placeholder="Enter logo URL"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
                placeholder="Enter shop description"
                rows="4"
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSaveShop}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this shop?</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleDeleteShop}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={closeModals}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorShop;
