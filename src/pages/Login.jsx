import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-md">
        <form className="card-body" onSubmit={handleLogin}>
          <h2 className="card-title text-center font-black text-xl">
            Login with credentials
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
          <button
            type="submit"
            className="btn w-full font-bold bg-red-600 border border-red-600 text-white hover:bg-red-500 hover:border-red-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
