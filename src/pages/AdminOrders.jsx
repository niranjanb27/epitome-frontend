import { useEffect, useState } from "react";
import api from "../services/api";

/* Date formatter */
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* Date filter logic */
const filterOrdersByDate = (orders, filter) => {
  const now = new Date();

  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    if (filter === "TODAY") {
      return orderDate.toDateString() === now.toDateString();
    }

    if (filter === "7_DAYS") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      return orderDate >= sevenDaysAgo;
    }

    if (filter === "MONTH") {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }

    return true; // ALL
  });
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState("ALL");

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

  const filteredOrders = filterOrdersByDate(orders, dateFilter);

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <div className="flex gap-3 items-center">
        <span className="font-semibold text-gray-700">Filter:</span>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="ALL">All Orders</option>
          <option value="TODAY">Today</option>
          <option value="7_DAYS">Last 7 Days</option>
          <option value="MONTH">This Month</option>
        </select>

        <span className="text-sm text-gray-500">
          Showing {filteredOrders.length} orders
        </span>
      </div>

      {filteredOrders.length === 0 && (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}

      {filteredOrders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-4 bg-white shadow"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="font-semibold text-gray-700">
                {order.chemist?.shopName || "Unknown Shop"}
              </p>
              <p className="text-xs text-gray-500">
                Ordered on: {formatDate(order.createdAt)}
              </p>
              <p className="text-xs text-gray-400">
                Order ID: {order._id.slice(-6).toUpperCase()}
              </p>
            </div>

            <span
              className={`font-bold px-3 py-1 rounded text-sm ${
                order.status === "PENDING"
                  ? "bg-yellow-200 text-yellow-800"
                  : order.status === "APPROVED"
                  ? "bg-green-200 text-green-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
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
              {order.items.map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">
                    {item.medicine?.name || "Unknown"}
                  </td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">₹{item.rate}</td>
                  <td className="border p-2">
                    ₹{item.quantity * item.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-3 text-right text-sm">
            <p>Subtotal: ₹{order.subTotal}</p>
            <p>GST: ₹{order.gstAmount}</p>
            <p className="font-bold text-lg">
              Grand Total: ₹{order.grandTotal}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            {order.status === "PENDING" && (
              <button
                onClick={() => updateStatus(order._id, "APPROVED")}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Approve
              </button>
            )}

            {order.status !== "DISPATCHED" && (
              <button
                onClick={() => updateStatus(order._id, "DISPATCHED")}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
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
