import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t ,i18n} = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert(t("signup.fillAllFields"));
      return;
    }

    localStorage.setItem("userFirstName", firstName);
    localStorage.setItem("userLastName", lastName);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    navigate("/");
  };
  useEffect(() => {
    // استرجاع اللغة من localStorage أو استخدام الانجليزية بشكل افتراضي
    const savedLang = localStorage.getItem("language") || "en";

    // تغيير لغة i18n
    i18n.changeLanguage(savedLang);

    // تعديل اتجاه الصفحة حسب اللغة
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);
  return (
    <div className="flex justify-center items-center h-screen bg-coffee-light">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-coffee-dark mb-4">{t("signup.title")}</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm mb-1">{t("signup.firstName")}</label>
            <input
              type="text"
              className="w-full border rounded-2xl px-3 py-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("signup.lastName")}</label>
            <input
              type="text"
              className="w-full border rounded-2xl px-3 py-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("signup.email")}</label>
            <input
              type="email"
              className="w-full border rounded-2xl px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("signup.password")}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-2xl px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? t("signup.hide") : t("signup.show")}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-900 cursor-pointer rounded-2xl text-white py-2 hover:bg-coffee-dark transition"
          >
            {t("signup.button")}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {t("signup.haveAccount")}{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-amber-800 font-medium hover:underline cursor-pointer"
          >
            {t("signup.login")}
          </span>
        </p>
      </div>
    </div>
  );
}
