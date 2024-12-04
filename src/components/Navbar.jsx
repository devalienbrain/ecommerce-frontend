import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../provider/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <div className="navbar shadow-sm px-6 py-4 w-full lg:w-3/4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-1">
          <img
            src="https://i.ibb.co.com/wQ61YwM/ecommerce-logo.png"
            alt="logo"
            className="w-9"
          />
          <span className="text-xl font-extrabold bg-gradient-to-tr bg-clip-text text-transparent from-green-700 via-black to-red-500">
            E-Commerce
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-3 text-sm font-semibold">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user.email}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-md border border-red-500 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-4 py-2 rounded-md border border-green-400 hover:border-red-500 hover:bg-red-500 hover:text-white">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 rounded-md bg-green-600 border border-green-600 hover:border-green-500 hover:bg-green-500 text-white">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
