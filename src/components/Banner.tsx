
import { useTranslation } from "react-i18next";

export default function Banner() {
  const { t } = useTranslation();

  return (
    <div className="bg-amber-900 text-white font-bold text-center py-2">
      {t("shippingToAllPartsOfTheWorld")}
    </div>
  );
}
