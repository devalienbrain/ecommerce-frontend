
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../provider/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // Use the login method from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(data);

      const token = data.token;
      // Decode token to get user ID
      const decoded = jwtDecode(token);

      // Fetch user details
      const userResponse = await axios.get(
        `http://localhost:5000/api/users/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User Details:", userResponse.data);

      // Save user and token using context
      login(userResponse.data, token);

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white">
      {/* Left Section: Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src="https://i.ibb.co.com/W3C6PLH/login.png"
          alt="Login Illustration"
          className="w-3/4 md:w-full h-auto max-w-md "
        />
      </div>

      {/* Right Section: Login Card */}
      <div className="md:w-1/2 flex justify-center items-center p-6">
        <div className="card w-full max-w-sm ">
          <form className="card-body" onSubmit={handleLogin}>
            <h2 className="card-title text-center font-black text-2xl text-gray-800">
              Login with Credentials
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
    </div>
  );
};

export default Login;
