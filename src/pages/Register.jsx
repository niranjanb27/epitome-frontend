import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("chemist");
  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
        shopName,
      });

      alert("User registered successfully!");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />

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
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Shop Name (Optional)"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setShopName(e.target.value)}
          disabled={loading}
        />

        <select
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={loading}
        >
          <option value="chemist">Chemist</option>
          {/* <option value="admin">Admin (PCD Owner)</option> */}
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            text-white`}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </div>
  );
}
