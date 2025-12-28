import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    // 🔥 use context login
    login(res.data.token, res.data.role);

    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/chemist");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Invalid login");
  }
};



  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Welcome To Sai Care Life Science
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        Login
      </button>

      <p className="text-center text-gray-500">
        Don't have an account?{" "}
        <span
          className="text-blue-600 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  </div>
);
}
