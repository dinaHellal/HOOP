import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
 const { t, i18n } = useTranslation();

  useEffect(() => {
    // استرجاع اللغة من localStorage أو استخدام الانجليزية بشكل افتراضي
    const savedLang = localStorage.getItem("language") || "en";

    // تغيير لغة i18n
    i18n.changeLanguage(savedLang);

    // تعديل اتجاه الصفحة حسب اللغة
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);  
  const whatsappNumber = "201004466279";

  const handleSend = () => {
    if (!name || !message) {
      alert(t("pleaseFillAllFields"));
      return;
    }
    const url = `https://wa.me/${whatsappNumber}?text=Hello, my name is ${encodeURIComponent(
      name
    )}.%0A${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b to-white p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 text-center mb-4 sm:mb-6">
          {t("contactUs")}
        </h2>
        <p className="text-sm sm:text-base text-amber-900 text-center mb-6">
          {t("fillFormWhatsApp")}
        </p>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-amber-900 mb-2 font-medium text-sm sm:text-base">
            {t("yourName")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("enterYourName")}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none text-sm sm:text-base"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <label className="block text-amber-900 mb-2 font-medium text-sm sm:text-base">
            {t("message")}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("typeYourMessage")}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none text-sm sm:text-base"
          ></textarea>
        </div>

        {/* Button */}
        <button
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-800 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base"
        >
          <FaWhatsapp className="text-lg sm:text-xl" /> {t("sendOnWhatsApp")}
        </button>
      </div>
    </div>
  );
}
