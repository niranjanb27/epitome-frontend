import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}

      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 bg-white shadow">
          {/* Compact Header: Shop Name + Status */}
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">
              {order.chemist ? order.chemist.shopName : "Unknown Shop"}
            </span>
            <span className={`font-bold px-2 py-1 rounded ${
              order.status === "PENDING"
                ? "bg-yellow-200 text-yellow-800"
                : order.status === "APPROVED"
                ? "bg-green-200 text-green-800"
                : "bg-blue-200 text-blue-800"
            }`}>
              {order.status}
            </span>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Medicine</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((i, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{i.medicine ? i.medicine.name : "Unknown"}</td>
                  <td className="border p-2">{i.quantity}</td>
                  <td className="border p-2">₹{i.rate}</td>
                  <td className="border p-2">₹{i.quantity * i.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-3 text-right">
            <p>Subtotal: ₹{order.subTotal}</p>
            <p>GST: ₹{order.gstAmount}</p>
            <p className="font-bold text-lg">Grand Total: ₹{order.grandTotal}</p>
          </div>

          {/* Status Buttons */}
          <div className="flex gap-3 mt-4">
            {order.status === "PENDING" && (
              <button
                onClick={() => updateStatus(order._id, "APPROVED")}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Approve
              </button>
            )}
            {order.status !== "DISPATCHED" && (
              <button
                onClick={() => updateStatus(order._id, "DISPATCHED")}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Dispatch
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
