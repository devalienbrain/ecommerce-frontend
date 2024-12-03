import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar shadow-sm">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-extrabold bg-gradient-to-tr bg-clip-text text-transparent from-green-700 via-black to-red-500"
        >
          E-Commerce
        </Link>
      </div>
      <div className="flex items-center gap-3 text-sm font-semibold">
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
      </div>
    </div>
  );
};

export default Navbar;
