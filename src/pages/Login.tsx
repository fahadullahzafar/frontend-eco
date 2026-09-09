import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/button";
import Input from "../components/Input";
import handleLogin from "../components/function/handlelogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Username
            </label>

            <Input
              placeholder="Enter your email or username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Login Button */}
          <Button
            className="w-full py-3 mt-2 text-base font-semibold"
            onClick={() => handleLogin(email, password)}
          >
            LOGIN
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
