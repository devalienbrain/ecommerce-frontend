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
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white">
      {/* Left Section: Register Card */}
      <div className="md:w-1/2 flex justify-center items-center p-6">
        <div className="card w-full max-w-sm">
          <form
            className="card-body text-sm font-semibold"
            onSubmit={handleRegister}
          >
            <h2 className="card-title text-center font-black text-2xl text-gray-800">
              Register a New Member
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

      {/* Right Section: Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src="https://i.ibb.co.com/yhhnpKc/register.png"
          alt="Registration Illustration"
          className="w-3/4 md:w-full h-auto max-w-md"
        />
      </div>
    </div>
  );
};

export default Register;
