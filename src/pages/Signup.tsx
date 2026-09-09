import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/Input";
import handleSignup from "../components/function/handleSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Register Button */}
          <Button
            className="w-full py-3 mt-2 text-base font-semibold"
            onClick={() =>
              handleSignup(email, username, password, confirmPassword)
            }
          >
            CREATE ACCOUNT
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              {" "}
              Login{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
