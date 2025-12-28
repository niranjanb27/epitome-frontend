import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";
import AdminOrders from "./AdminOrders";

export default function AdminDashboard() {
  const [medicines, setMedicines] = useState([]);
  const [editMedicine, setEditMedicine] = useState(null);
  const navigate = useNavigate();

  // Fetch medicines from backend
  const fetchMedicines = async () => {
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      {/* Header with Logout */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Medicine Form */}
      <MedicineForm
        fetchMedicines={fetchMedicines}
        editMedicine={editMedicine}
        setEditMedicine={setEditMedicine}
      />

      {/* Medicine List */}
      <MedicineList
        medicines={medicines}
        fetchMedicines={fetchMedicines}
        setEditMedicine={setEditMedicine}
      />

      {/* Orders Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Chemist Orders
        </h2>

        <AdminOrders />
      </div>
    </div>
  );
}
