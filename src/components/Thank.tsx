import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {  FaWhatsapp } from "react-icons/fa";

export default function Thank() {
  const lastId = localStorage.getItem("lastOrderId");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-amber-900">{t("thankTitle")}</h1>
        <a href="https://wa.me/201145870076" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-white text-green-500 p-4 rounded-full shadow-lg  transition-all z-50">
                <FaWhatsapp size={23} />
              </a>
      <p className="text-gray-600">{t("thankMessage")}</p>
      {lastId && (
        <p className="mt-4 leading-6 text-amber-900 font-semibold">
        </p>
      )}
    </div>
  );
}
