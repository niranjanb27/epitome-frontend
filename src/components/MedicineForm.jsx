import { useEffect, useState } from "react";
import api from "../services/api";

export default function MedicineForm({
  fetchMedicines,
  editMedicine,
  setEditMedicine,
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [rate, setRate] = useState("");
  const [price, setPrice] = useState("");
  const [scheme, setScheme] = useState("");
  const [inputs, setInputs] = useState("");

  useEffect(() => {
    if (editMedicine) {
      setName(editMedicine.name);
      setCompany(editMedicine.company);
      setRate(editMedicine.rate);
      setPrice(editMedicine.price);
      setScheme(editMedicine.scheme || "");
      setInputs(editMedicine.inputs || "");
    }
  }, [editMedicine]);

  const resetForm = () => {
    setName("");
    setCompany("");
    setRate("");
    setPrice("");
    setScheme("");
    setInputs("");
    setEditMedicine(null);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        company,
        rate,
        price,
        scheme,
        inputs,
      };

      if (editMedicine) {
        await api.put(`/medicines/${editMedicine._id}`, payload);
      } else {
        await api.post("/medicines", payload);
      }

      resetForm();
      fetchMedicines();
    } catch (err) {
      alert("Save failed");
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this medicine?")) return;

    try {
      await api.delete(`/medicines/${editMedicine._id}`);
      resetForm();
      fetchMedicines();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editMedicine ? "Edit Medicine" : "Add Medicine"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Medicine Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Company Name"
          className="border p-2 rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rate (₹)"
          className="border p-2 rounded"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Scheme (e.g. 10+1)"
          className="border p-2 rounded"
          value={scheme}
          onChange={(e) => setScheme(e.target.value)}
        />

        <input
          // type="number"
          placeholder="Inputs / Pack"
          className="border p-2 rounded"
          value={inputs}
          onChange={(e) => setInputs(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {editMedicine ? "Update" : "Add"}
        </button>

        {editMedicine && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded"
          >
            Delete
          </button>
        )}

        {editMedicine && (
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
