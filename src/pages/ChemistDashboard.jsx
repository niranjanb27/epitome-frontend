import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import OrderTable from "../components/OrderTable";
import { Menu, X } from "lucide-react";

export default function ChemistDashboard() {
  const [medicines, setMedicines] = useState([]);
  const [shopName, setShopName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
      const res = await api.get("/auth/me");
      setShopName(res.data.shopName);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchChemistInfo();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">
              Sai Care Life Science
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Welcome, <span className="font-semibold">{shopName}</span>
            </p>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex gap-3 items-center">
            <button
              onClick={() => navigate("/support")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Customer Support
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-gray-700"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden mt-4 space-y-2">
            <button
              onClick={() => {
                navigate("/support");
                setMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Customer Support
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        <OrderTable medicines={medicines} />
      </main>
    </div>
  );
}
