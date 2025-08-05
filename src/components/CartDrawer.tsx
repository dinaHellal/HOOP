// src/components/CartDrawer.tsx
import { useState } from "react";
import { FiShoppingCart, FiX, FiTrash2 } from "react-icons/fi";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + Number(item.price) * (item.quantity ?? 1), 0);

  return (
    <>
      {/* Trigger */}
      <button onClick={() => setIsOpen(true)} className="flex items-center cursor-pointer hover:text-amber-500 gap-2 text-amber-900">
        <FiShoppingCart size={24} />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-[#808080a9] bg-opacity-50 z-[98]" onClick={() => setIsOpen(false)}></div>}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[600px] max-w-full bg-white shadow-xl z-[99] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl">Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl cursor-pointer font-bold">
            <FiX />{" "}
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[75%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-center border-b pb-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-600">${Number(item.price).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => removeFromCart(String(item.id))} className="px-2 py-1 bg-gray-200">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="px-2 py-1 bg-gray-200">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold">${(Number(item.price) * (item.quantity ?? 1)).toFixed(2)}</p>

                  {/* Delete entire product */}
                  <button onClick={() => removeFromCart(String(item.id))} className="text-red-600">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2">
          <div className="flex justify-between mb-3 font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/checkout");
            }}
            className="w-full bg-amber-900 cursor-pointer text-white py-2 rounded-2xl"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
