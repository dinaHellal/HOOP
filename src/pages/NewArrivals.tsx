import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../useCart"; // تأكدي من المسار
import type { Product } from "../type";

type Props = {
  newArrivals: Product[];
};

export default function NewArrivals({ newArrivals }: Props) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
    toast.success(`${product.title} added to cart!`);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[id] || 1) + delta, 1);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newArrivals.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
              <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-gray-600 text-lg mb-4">{product.price}</p>

              <div className="flex justify-center items-center gap-2 mb-3">
                <button onClick={() => handleQuantityChange(String(product.id), -1)} className="bg-gray-300 px-2 rounded">
                  -
                </button>
                <span className="w-6 text-center">{quantities[String(product.id)] || 1}</span>
                <button onClick={() => handleQuantityChange(String(product.id), 1)} className="bg-gray-300 px-2 rounded">
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-amber-900 hover:bg-amber-800 text-white px-5 py-2 rounded-lg text-sm transition flex items-center justify-center gap-2 mx-auto"
              >
                <FiShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button onClick={() => navigate("/shop")} className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg transition">
          View All Products
        </button>
      </div>
    </section>
  );
}
