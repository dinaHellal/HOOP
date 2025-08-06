import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // حساب الكمية
  const totalQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;

useEffect(() => {
  const userData = localStorage.getItem("user");
  try {
    const user = userData ? JSON.parse(userData) : null;
    setIsLoggedIn(!!user);
  } catch {
    setIsLoggedIn(false);
  }
}, [location]);  // ← يعمل فقط عند أول تحميل للصفحة


  const toggleMenu = () => setMenuOpen(!menuOpen);
console.log("cartItems", cartItems);
console.log("totalQuantity", totalQuantity);
  return (
    <nav className="fixed top-8 left-0 w-full z-50 bg-transparent font-bold text-amber-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 text-2xl">
          <img src="/hoop.webp" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <Link to="/">Hoop</Link>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-6">
          <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
          <li><Link to="/shop" className="hover:text-amber-400">Shop</Link></li>
          <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>
          <li><Link to="/tracking" className="hover:text-amber-400">Track Order</Link></li>
        </ul>

        {/* -------- Desktop -------- */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative text-2xl cursor-pointer">
            <CartDrawer />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
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
              <button className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* -------- Mobile -------- */}
        <div className="md:hidden flex items-center gap-4">
          <div className="relative text-2xl text-amber-900 cursor-pointer flex flex-col items-center">
            <CartDrawer />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>

          <button onClick={toggleMenu} className="text-amber-900 text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-5 space-y-3 bg-white text-amber-900 pb-6">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">Shop</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">Contact</Link>
          <Link to="/tracking" onClick={() => setMenuOpen(false)} className="block hover:text-amber-400">Track Order</Link>

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
