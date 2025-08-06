import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity ?? 1),
    0
  );

  const handleOrder = () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill in all customer details.");
      return;
    }

    // generate order
    const currentCounter =
      Number(localStorage.getItem("orders_counter")) || 1;
    const newId = `HOOP-${currentCounter}`;

    const newOrder = {
      id: newId,
      name,
      phone,
      total,
      expectedDate: "",
      status: "Processing" as const,
    };

    const storedOrders = localStorage.getItem("orders");
    const ordersArray = storedOrders ? JSON.parse(storedOrders) : [];
    ordersArray.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(ordersArray));
    localStorage.setItem("orders_counter", (currentCounter + 1).toString());
    localStorage.setItem("lastOrderId", newOrder.id);

    const message = `
Order ID: ${newOrder.id}
Name: ${name}
Phone: ${phone}
Address: ${address}
Total: $${total.toFixed(2)}
    `;
    // open WhatsApp
    window.open(
      `https://wa.me/201004466279?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    clearCart(); // ✅ يفضي السلة بمجرد الضغط
    navigate("/thank");
  };

  return (
    <div className="max-w-4xl mt-15 mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <h2 className="text-xl mb-2 font-semibold">Your Order</h2>
      <ul className="border rounded p-4 space-y-2 mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between md:flex-row flex-col">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${Number(item.price) * (item.quantity ?? 1)}</span>
          </li>
        ))}
        <li className="flex justify-between font-bold pt-2 border-t mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </li>
      </ul>

      <h2 className="text-xl mb-2 font-semibold">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="border p-3 rounded w-full" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="border p-3 rounded w-full" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="border p-3 rounded w-full" />
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address" className="border p-3 rounded w-full col-span-full" />
      </div>

      <button onClick={handleOrder} className="bg-amber-900 text-white py-3 px-6 rounded w-full md:w-auto">
        Place Order on WhatsApp
      </button>
    </div>
  );
}
