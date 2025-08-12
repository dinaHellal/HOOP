import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../Products";
import type { Product } from "../type";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRatings } from "../useRatings"; // ✅ important
import { FaWhatsapp } from "react-icons/fa";

export default function Shop() {
  const { addToCart } = useCart();
  const [cartState] = useState<Record<string, { showControls: boolean; quantity: number }>>({});
  const navigate = useNavigate();



  return (
    <div className="min-h-screen mt-15 px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-amber-900 mb-6">Shop All Products</h1>
      <p className="text-center text-gray-600 mb-10">Browse through our elegant and modest collection of clothing.</p>
  <a
          href="https://wa.me/201004466279"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-white text-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
        >
          <FaWhatsapp size={23} />
        </a>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product: Product) => {
          const isShown = cartState[product.id]?.showControls || false;
          const { rating, count } = useRatings(product.title); // rating hook

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
                <img src={product.image} alt={product.title} className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <div className="p-4 ">
                <h2 className="text-lg font-semibold text-amber-900">{product.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>

                {/*  Rating read only */}
                <div className="flex  items-center gap-1 mt-1" title={`Rating: ${rating.toFixed(1)} (${count})`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-xl ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-sm  text-gray-500 ml-1">({count})</span>
                </div>

                <p className="text-amber-800 font-bold mt-2">${product.price}</p>

                {!isShown ? (
                  <button
                    onClick={() => {
                      addToCart({ ...product, price: Number(product.price) });
                      toast.success(`${product.title} added to cart!`, {
                        autoClose: 1500,
                        toastId: `cart-${product.id}`,
                      });
                    }}
                    className="w-full bg-amber-900 hover:bg-amber-800 text-white py-2 rounded-md font-semibold transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-4 flex items-center justify-center gap-4"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
