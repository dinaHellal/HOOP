import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const total = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity ?? 1),
    0
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const handleOrder = () => {
    if (cartItems.length === 0 || total <= 0) {
      alert(t("emptyCart"));
      return;
    }

    if (!name || !email || !phone || !address) {
      alert(t("fillDetails"));
      return;
    }

    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      alert(t("invalidPhone"));
      return;
    }

    const currentCounter = Number(localStorage.getItem("orders_counter")) || 1;

    const newOrder = {
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
    localStorage.setItem("lastOrderId", currentCounter.toString());

    const itemsDetails = cartItems
      .map(
        (item) =>
          `• ${item.title} x ${item.quantity} = ${(
            (Number(item.price) || 0) * (item.quantity ?? 1)
          ).toFixed(2)} `
      )
      .join("\n");

    const message = `
Name: ${name}
Phone: ${phone}
Address: ${address}
------------------------
Items:
${itemsDetails}
------------------------
Total: ${total.toFixed(2)} ${t("currency")}
    `;

    // ✅ إرسال الرسالة لواتساب
    window.open(
      `https://wa.me/201114488488?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    clearCart();
    navigate("/thank");
  };

  return (
    <div className="max-w-4xl mt-15 mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("checkout")}</h1>

      <h2 className="text-xl mb-2 font-semibold">{t("yourOrder")}</h2>
      <ul className="border rounded p-4 space-y-2 mb-6">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between md:flex-row flex-col ">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>{Number(item.price) * (item.quantity ?? 1)} {t("currency")}</span>
          </li>
        ))}
        <li className="flex justify-between font-bold pt-2 border-t mt-2">
          <span>{t("total")}</span>
          <span>{total.toFixed(2)}  {t("currency")}</span>
        </li>
      </ul>

      <h2 className="text-xl mb-2 font-semibold">{t("customerDetails")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("fullName")}
          className="border p-3 rounded w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email")}
          className="border p-3 rounded w-full"
        />
        <input
          value={phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setPhone(value);
            }
          }}
          placeholder={t("phone")}
          className="border p-3 rounded w-full"
          maxLength={11}
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t("address")}
          className="border p-3 rounded w-full col-span-full"
        />
      </div>

      <button
        onClick={handleOrder}
        className="bg-amber-900 text-white py-3 px-6 rounded w-full md:w-full"
      >
        {t("placeOrder")}
      </button>
    </div>
  );
}
