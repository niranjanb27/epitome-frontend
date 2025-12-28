import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import OrderTable from "../components/OrderTable";

export default function ChemistDashboard() {
  const [medicines, setMedicines] = useState([]);
  const [shopName, setShopName] = useState("");
  const navigate = useNavigate();

  // Fetch medicines
  const fetchMedicines = async () => {
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
    }
  };

  // Fetch chemist info
  const fetchChemistInfo = async () => {
    try {
      const res = await api.get("/auth/me"); // backend route to get current user
      setShopName(res.data.shopName);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchChemistInfo();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600">
          Welcome, {shopName}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <OrderTable medicines={medicines} />
    </div>
  );
}
