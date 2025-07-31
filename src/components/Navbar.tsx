import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      try {
        const user = userData ? JSON.parse(userData) : null;
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error("خطأ في تحليل بيانات المستخدم من localStorage:", error);
        setIsLoggedIn(false);
      }
    }
  }, [location]); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  console.log(location.pathname);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white font-bold text-2xl">
          <img src="/hoop.webp" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <h1>Hoop</h1>
        </div>

        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="/" className="hover:text-amber-400 transition">
Home            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-amber-400 transition">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-amber-400 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-amber-400 transition">
Contact            </Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                navigate("/login"); 
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition"
            >
Log Out            </button>
          ) : (
            <Link to="/Login">
              <button className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition">
Log Out              </button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 px-4 space-y-3 text-white pb-6">
          <Link to="/" className="block hover:text-amber-400">
            الرئيسية
          </Link>
          <Link to="/shop" className="block hover:text-amber-400">
            المتجر
          </Link>
          <Link to="/about" className="block hover:text-amber-400">
            حول
          </Link>
          <Link to="/contact" className="block hover:text-amber-400">
            اتصل بنا
          </Link>
          {isLoggedIn ? ( // منطق مصحح لقائمة الجوال
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                setMenuOpen(false); // إغلاق القائمة عند تسجيل الخروج
                navigate("/login");
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full"
            >
              تسجيل الخروج
            </button>
          ) : (
            <Link to="/Login">
              <button
                onClick={() => setMenuOpen(false)} // إغلاق القائمة عند الانتقال إلى تسجيل الدخول
                className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full"
              >
                تسجيل الدخول
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}