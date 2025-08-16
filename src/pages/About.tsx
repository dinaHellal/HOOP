import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mt-15 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-6 text-center">{t("aboutUs")}</h1>
      <a
        href="https://wa.me/201004466279"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-white text-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
      >
        <FaWhatsapp size={23} />
      </a>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        {t("welcomeTo")} <span className="font-semibold">Hoop</span> – {t("destinationFashion")}
      </p>

      <p className="text-lg leading-relaxed text-gray-700 mb-4">{t("foundedWithLove")}</p>

      <p className="text-lg leading-relaxed text-gray-700">{t("thankYouChoosingUs")}</p>
    </div>
  );
}
