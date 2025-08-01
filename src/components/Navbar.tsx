// components/Navbar.tsx
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../type";

interface NavbarProps {
  cartItemCount: number;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

export default function Navbar({ cartItemCount, setCartItems }: NavbarProps) {
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
        console.error("Error parsing user data from localStorage:", error);
        setIsLoggedIn(false);
      }
    }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent  text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white font-bold text-2xl">
          <img src="/hoop.webp" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <h1>Hoop</h1>
        </div>

        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="/" className=" hover:text-amber-400  transition">
              Home
            </Link>
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
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex text-white items-center gap-4">
          <Link to="/cart" className="relative   text-2xl hover:text-amber-400 transition">
            <FiShoppingCart />
            {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                setCartItems([]); // Clear cart on logout
                navigate("/login");
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition"
            >
              Log Out
            </button>
          ) : (
            <Link to="/Login">
              <button className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition">Login</button>
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative text-white text-2xl hover:text-amber-400 transition">
            <FiShoppingCart />
            {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
          </Link>
          <button onClick={toggleMenu} className="text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 px-4 space-y-3 bg-transparent  text-white pb-6">
          <Link to="/" className="block hover:text-amber-400" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className="block hover:text-amber-400" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/about" className="block hover:text-amber-400" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" className="block hover:text-amber-400" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                setMenuOpen(false);
                setCartItems([]);
                navigate("/login");
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full"
            >
              Log Out
            </button>
          ) : (
            <Link to="/Login">
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
