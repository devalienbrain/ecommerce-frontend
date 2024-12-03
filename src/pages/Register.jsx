import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen shadow-xl border border-gray-400">
      <div className="card w-96 bg-base-100 shadow-md">
        <form
          className="card-body text-sm font-semibold"
          onSubmit={handleRegister}
        >
          <h2 className="card-title text-center font-black text-xl">
            Register a new member
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="select select-bordered w-full mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="vendor">Vendor</option>
          </select>
          <button
            type="submit"
            className="btn w-full font-bold bg-green-600 border border-green-600 text-white hover:bg-green-500 hover:border-green-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
