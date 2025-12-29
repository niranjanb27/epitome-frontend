import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token, res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/chemist");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid login");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition mb-4
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            text-white`}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
            onClick={() => !loading && navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
