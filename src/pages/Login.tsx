import { useState , useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t , i18n} = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
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
        <h2 className="text-2xl font-bold text-coffee-dark mb-4">{t("login.title")}</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{t("login.email")}</label>
            <input
              type="email"
              className="w-full border rounded-2xl px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">{t("login.password")}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-2xl px-3 py-2 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 cursor-pointer"
              >
                {showPassword ? t("login.hide") : t("login.show")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-amber-900 cursor-pointer" />
            <label htmlFor="remember" className="text-sm cursor-pointer">
              {t("login.rememberMe")}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-900 rounded-2xl text-white py-2 cursor-pointer transition"
          >
            {t("login.button")}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {t("login.noAccount")}{" "}
          <Link to="/signup" className="text-amber-800 font-medium hover:underline">
            {t("login.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
