import { useParams } from "react-router-dom";
import { products } from "../Products";
import type { Product } from "../type";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  // نجيب المنتج اللي الـ id بتاعه مطابق
  const product = products.find((p: Product) => p.id === id);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        {t("productNotFound")}
      </div>
    );
  }

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart({ ...product, price: Number(product.price) });

    toast.success(`${t(product.title)} ${t("addedToCart")}`, {
      autoClose: 1500,
      toastId: `cart-${product.id}`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* صورة المنتج */}
        <img
          src={product.image}
          alt={t(product.title)}
          className="w-full h-[400px] object-cover rounded-lg shadow-md"
        />

        {/* تفاصيل المنتج */}
        <div className="space-y-6 mt-18">
          <h1 className="text-3xl font-bold text-amber-900">{t(product.title)}</h1>
          <p className="text-gray-600 mt-4 text-lg">{t(product.description)}</p>
          <p className="text-2xl text-amber-800 font-bold mt-4">${product.price}</p>

          {/* التحكم في الكمية */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleDecrease}
              className="bg-gray-200 text-xl px-4 py-2 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-gray-200 text-xl px-4 py-2 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* زر الإضافة للسلة */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-amber-900 hover:bg-amber-800 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
