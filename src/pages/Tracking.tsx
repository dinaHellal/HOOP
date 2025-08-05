import { useState } from "react";

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
      const list: Order[] = JSON.parse(stored);
      const found = list.find((o) => o.id === orderNumber);
      if (found) {
        setOrder(found);
        setError("");
      } else {
        setOrder(null);
        setError("Order not found. Please check your order number.");
      }
    } else {
      setError("No orders have been added yet.");
    }
  };

  return (
    <div className="max-w-xl mt-15 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>

      <input
        type="text"
        placeholder="Enter your order number (e.g. HOOP-1)"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <button onClick={handleTrack} className="w-full bg-amber-900 text-white py-3 rounded hover:bg-amber-800 transition">
        Track Order
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {order && (
        <div className="mt-6 bg-amber-100 p-4 rounded space-y-1">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Name:</strong> {order.name}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Expected Delivery:</strong> {order.expectedDate}</p>
        </div>
      )}
    </div>
  );
}
