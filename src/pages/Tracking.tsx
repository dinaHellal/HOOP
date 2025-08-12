import { useState } from "react";
import {  FaWhatsapp } from "react-icons/fa";

interface Order {
  id: string;
  name: string;
  phone: string;
  total: number;
  expectedDate: string;
  status: string;
}

export default function Tracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    const stored = localStorage.getItem("orders");

    if (stored) {
      let list: Order[] = [];

      try {
        list = JSON.parse(stored);
      } catch {
        setError("Could not read saved orders.");
        return;
      }

      const found = list.find((o) => o.id === orderNumber.trim());

      if (found) {
        setOrder(found);
        setError("");
      } else {
        setOrder(null);
        setError("Order not found. Please check your order ID.");
      }
    } else {
      setOrder(null);
      setError("No orders found.");
    }
  };

  return (
    <div className="max-w-xl mt-20 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>

      <input
        type="text"
        placeholder="Enter Order ID (e.g. HOOP-123456)"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleTrack}
        className="w-full bg-amber-900 text-white py-3 rounded hover:bg-amber-800 transition"
      >
        Track Order
      </button>
  <a
          href="https://wa.me/201004466279"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-white text-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
        >
          <FaWhatsapp size={23} />
        </a>
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {order && (
        <div className="mt-6 bg-amber-100 p-4 rounded space-y-1">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Expected Delivery:</strong> {order.expectedDate || "-"}</p>
        </div>
      )}
    </div>
  );
}
