import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", newLang);
  };
  // حساب الكمية

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, []);
  const totalQuantity = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [location]);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle language between 'en' and 'ar'

  console.log("cartItems", cartItems);
  console.log("totalQuantity", totalQuantity);
  return (
    <nav className="fixed top-8 left-0 w-full z-50 bg-white text-amber-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 text-2xl">
          <img src="/hoop.webp" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <Link to="/">{t("Hoop")}</Link>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="/" className="hover:text-amber-400">
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-amber-400">
              {t("Shop")}
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-amber-400">
              {t("AboutUs")}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-amber-400">
              {t("Contact")}
            </Link>
          </li>
        </ul>

        {/* -------- Desktop -------- */}
        <div className="hidden md:flex items-center gap-4">
          <select onChange={handleLanguageChange} value={i18n.language} className=" rounded-2xl border border-amber-900 px-2 py-1 text-amber-900">
            <option value="en">EN</option>
            <option value="ar">العربية</option>
          </select>
          <div className="relative text-2xl cursor-pointer">
            <CartDrawer />
            {totalQuantity > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">{totalQuantity}</span>}
          </div>

          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                navigate("/login");
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition">{t("Login")}</button>
            </Link>
          )}
        </div>

        {/* -------- Mobile -------- */}
        <div className="md:hidden flex items-center gap-4">
          <select onChange={handleLanguageChange} value={i18n.language} className="outline-none rounded px-2 py-1 text-amber-900">
            <option value="en">EN</option>
            <option value="ar">العربية</option>
          </select>
          <div className="relative text-2xl text-amber-900 cursor-pointer flex flex-col items-center">
            <CartDrawer />
            {totalQuantity > 0 && <span className="absolute -top-2 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalQuantity}</span>}
          </div>

          <button onClick={toggleMenu} className="text-amber-900 text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-5 space-y-3 bg-white text-amber-900 pb-6">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">
            {t("home")}
          </Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">
            {t("Shop")}
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">
            {t("AboutUs")}
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">
            {t("Contact")}
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                setMenuOpen(false);
                navigate("/login");
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button onClick={() => setMenuOpen(false)} className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
