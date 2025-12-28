export default function MedicineList({ medicines, setEditMedicine }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Medicine List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Medicine</th>
              <th className="border p-2">Company</th>
              <th className="border p-2">Rate (₹)</th>
              <th className="border p-2">Price (₹)</th>
              <th className="border p-2">Scheme</th>
              <th className="border p-2">Inputs</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No medicines available
                </td>
              </tr>
            )}

            {medicines.map((med) => (
              <tr
                key={med._id}
                className="text-center hover:bg-gray-50"
              >
                <td className="border p-2 font-semibold text-gray-800">
                  {med.name}
                </td>

                <td className="border p-2 text-gray-600">
                  {med.company}
                </td>

                <td className="border p-2">
                  ₹{med.rate}
                </td>

                <td className="border p-2 font-bold text-green-600">
                  ₹{med.price}
                </td>

                <td className="border p-2 text-blue-600 font-medium">
                  {med.scheme || "-"}
                </td>

                <td className="border p-2">
                  {med.inputs || "-"}
                </td>

                <td className="border p-2">
                  <button
                    onClick={() => setEditMedicine(med)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
