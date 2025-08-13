import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import type { Product } from "../type";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // استرجاع اللغة من localStorage
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const totalPrice = cartItems.reduce((acc: number, item: Product) => acc + Number(item.price) * (item.quantity ?? 1), 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" className="w-40 mx-auto mb-6 opacity-60" alt="empty" />
        <p className="text-gray-500 text-xl mb-4">{t("cart.empty")}</p>
        <Link to="/" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 duration-200">
          {t("cart.backToShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t("cart.title")}</h1>

      <div className="space-y-6">
        {cartItems.map((item: Product) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />

            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-500">{Number(item.price).toFixed(2)} {t("currency")}</p>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => removeFromCart(String(item.id))}
                className="px-3 py-1 bg-red-500 text-white rounded-md mr-2"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="px-3 py-1 bg-green-500 text-white rounded-md"
              >
                +
              </button>
            </div>

            <p className="font-semibold ml-6">
              {(Number(item.price) * (item.quantity ?? 1)).toFixed(2)} {t("currency")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <h2 className="text-xl font-bold mb-4">
          {t("cart.total")}: {totalPrice.toFixed(2)} {t("currency")}
        </h2>

        <button className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 duration-200">
          {t("cart.checkout")}
        </button>
      </div>
    </div>
  );
}
