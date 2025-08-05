import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../Products";
import type { Product } from "../type";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Shop() {
  const { addToCart } = useCart();
  const [cartState, setCartState] = useState<Record<string, { showControls: boolean; quantity: number }>>({});
  const navigate = useNavigate();

  const handleAddFirstTime = (p: Product) => {
    setCartState((prev) => ({
      ...prev,
      [p.id]: { showControls: true, quantity: 1 },
    }));
    addToCart(p);
    toast.success("  Product added to cart!");
  };

  return (
    <div className="min-h-screen mt-15 px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-6">Shop All Products</h1>
      <p className="text-center text-gray-600 mb-10">Browse through our elegant and modest collection of clothing.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product: Product) => {
          const isShown = cartState[product.id]?.showControls || false;

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
                <img src={product.image} alt={product.title} className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-amber-900">{product.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <p className="text-amber-800 font-bold mt-2">${product.price}</p>

                {!isShown ? (
                  <button onClick={() => handleAddFirstTime(product)} className="mt-4 bg-amber-900 text-white px-4 py-2 rounded hover:bg-amber-800 mx-auto flex items-center gap-2">
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <CartDrawer />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
