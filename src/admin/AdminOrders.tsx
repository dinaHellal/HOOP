import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type OrderStatus = "Processing" | "Shipped" | "Delivered";

interface Order {
  id: string;
  name: string;
  phone: string;
  total: number;
  expectedDate: string;
  status: OrderStatus;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState<number | undefined>();
  const [expectedDate, setExpectedDate] = useState("");
  const [counter, setCounter] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem("admin_logged_in");
    if (!check) navigate("/admin-login");

    const savedOrders = localStorage.getItem("orders");
    const savedCounter = localStorage.getItem("orders_counter");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedCounter) setCounter(Number(savedCounter));
  }, [navigate]);

  const saveAll = (updated: Order[], updatedCounter?: number) => {
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    if (updatedCounter !== undefined) {
      localStorage.setItem("orders_counter", updatedCounter.toString());
    }
  };

  const addOrder = () => {
    if (!name || !phone || !total || !expectedDate) {
      toast.error("Please fill all fields");
      return;
    }
    const orderId = `HOOP-${counter}`;
    const newOrder: Order = {
      id: orderId,
      name,
      phone,
      total,
      expectedDate,
      status: "Processing"
    };
    const newList = [...orders, newOrder];
    saveAll(newList, counter + 1);
    toast.success("Order added!");
    setName("");
    setPhone("");
    setTotal(undefined);
    setExpectedDate("");
  };

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    saveAll(updated);
    toast.success("Status updated!");
  };

  const logout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin-login");
  };

  const today = new Date().toISOString().split("T")[0]; //min date => today

  return (
    <div className="p-6 mt-30 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button onClick={logout} className="text-sm bg-red-600 text-white px-3 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="mb-8 bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-3">Add New Order</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" className="border p-2 rounded" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="border p-2 rounded" />
          <input
            value={total === undefined ? "" : total}
            onChange={(e) => setTotal(Number(e.target.value))}
            placeholder="Total price"
            type="number"
            className="border p-2 rounded"
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={expectedDate}
            min={today}
            onChange={(e) => setExpectedDate(e.target.value)}
            />
          <button onClick={addOrder} className="bg-amber-900 text-white px-4 py-2 rounded">
            Add + Generate ID
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Order ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Total</th>
            <th className="p-2">Expected</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.name}</td>
              <td className="p-2">{o.phone}</td>
              <td className="p-2">${o.total}</td>
              <td className="p-2">{o.expectedDate}</td>
              <td className="p-2">
                <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)} className="border rounded p-1">
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
