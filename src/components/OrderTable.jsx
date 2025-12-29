import { useEffect, useState } from "react";
import api from "../services/api";

export default function OrderTable({ medicines }) {
  const [quantities, setQuantities] = useState({});
  const [orders, setOrders] = useState([]);

  /* ======================
     ORDER CREATION LOGIC
  ====================== */

  const handleQtyChange = (id, value) => {
    setQuantities({ ...quantities, [id]: Number(value) });
  };

  const getItemTotal = (med) => {
    const qty = quantities[med._id] || 0;
    return qty * med.rate;
  };

  const getSubTotal = () => {
    return medicines.reduce((sum, med) => {
      const qty = quantities[med._id] || 0;
      return sum + qty * med.rate;
    }, 0);
  };

  const getGST = () => (getSubTotal() * 5) / 100;
  const getGrandTotal = () => getSubTotal() + getGST();

  const placeOrder = async () => {
    const orderItems = medicines
      .filter((med) => quantities[med._id] > 0)
      .map((med) => ({
        medicine: med._id,
        quantity: quantities[med._id],
        rate: med.rate,
      }));

    if (orderItems.length === 0) {
      alert("Please enter quantity");
      return;
    }

    try {
      await api.post("/orders", { items: orderItems });
      alert("Order placed successfully!");
      setQuantities({});
      fetchMyOrders();
    } catch (err) {
      alert("Order failed");
    }
  };

  /* ======================
     FETCH CHEMIST ORDERS
  ====================== */

  const fetchMyOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="space-y-10">
      {/* ======================
          PLACE ORDER SECTION
      ====================== */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-green-700">
          Place New Order
        </h2>

        {/* Scrollable table for mobile */}
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Medicine</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">MRP</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Scheme</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med._id} className="text-center">
                  <td className="border p-2 font-semibold">{med.name}</td>
                  <td className="border p-2">{med.company}</td>
                  <td className="border p-2 text-gray-500">₹{med.price}</td>
                  <td className="border p-2 text-green-600 font-bold">
                    ₹{med.rate}
                  </td>
                  <td className="border p-2">{med.scheme || "-"}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      min="0"
                      className="w-16 sm:w-20 border p-1 rounded"
                      value={quantities[med._id] || ""}
                      onChange={(e) =>
                        handleQtyChange(med._id, e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2 font-bold">
                    ₹{getItemTotal(med)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mt-6 flex justify-end">
          <div className="bg-gray-50 border rounded-lg p-4 w-full sm:w-80">
            <h3 className="text-lg font-bold mb-3">Order Summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>₹{getSubTotal()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>GST (5%)</span>
              <span>₹{getGST()}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold text-green-600">
              <span>Grand Total</span>
              <span>₹{getGrandTotal()}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={placeOrder}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-2 rounded w-full sm:w-auto"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* ======================
          YOUR ORDERS SECTION
      ====================== */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-blue-700">
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold">
                    Order #{order._id.slice(-5)}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      order.status === "DISPATCHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 border">Medicine</th>
                        <th className="p-2 border">Company</th>
                        <th className="p-2 border">Qty</th>
                        <th className="p-2 border">Rate</th>
                        <th className="p-2 border">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td className="p-2 border">
                            {item.medicine?.name}
                          </td>
                          <td className="p-2 border">
                            {item.medicine?.company}
                          </td>
                          <td className="p-2 border text-center">
                            {item.quantity}
                          </td>
                          <td className="p-2 border text-right">
                            ₹{item.rate}
                          </td>
                          <td className="p-2 border text-right">
                            ₹{item.quantity * item.rate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card view */}
                <div className="sm:hidden space-y-3">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="border rounded p-2 text-sm"
                    >
                      <p className="font-semibold">
                        {item.medicine?.name}
                      </p>
                      <p className="text-gray-500">
                        {item.medicine?.company}
                      </p>
                      <p>
                        Qty: {item.quantity} × ₹{item.rate}
                      </p>
                      <p className="font-bold">
                        Total: ₹{item.quantity * item.rate}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-right mt-3 space-y-1 text-sm">
                  <p>Subtotal: ₹{order.subTotal}</p>
                  <p>GST (5%): ₹{order.gstAmount}</p>
                  <p className="font-bold text-lg">
                    Grand Total: ₹{order.grandTotal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
