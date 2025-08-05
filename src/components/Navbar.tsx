import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import type { Product } from "../type";
import { useCart } from "../useCart"; 
import CartDrawer from "./CartDrawer";


// type NavbarProps = {
//   cartItemCount: number;
//   setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
// };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // نحسب إجمالي الكميات (القطع)
  const totalQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;

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
    
    <nav className="fixed top-8 left-0 w-full z-50 bg-transparent font-bold  text-amber-900">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold  text-amber-900 text-2xl">
          <img src="/hoop.webp" alt="logo" className="w-10 h-10 rounded-full object-cover" />
          <Link to="/" className="font-bold text-2xl text-amber-900">
            Hoop
          </Link>
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

        <div className="hidden md:flex font-bold  text-amber-900 items-center gap-4">
          <Link to="/cart" className="relative  flex gap-3  text-2xl hover:text-amber-400 transition">

            {totalQuantity > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalQuantity}</span>}
          </Link>
          <CartDrawer />

          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
                // setCartItems([]); // Clear cart on logout
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
          <Link to="/cart" className="relative text-amber-900 text-2xl hover:text-amber-400 transition">
          <CartDrawer />
            {totalQuantity > 0 && 
            <span className="absolute -top-2 -right-2 bg-red-600 text-amber-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}</span>}
          </Link>
          <button onClick={toggleMenu} className="text-amber-900 cursor-pointer text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3  px-4 space-y-3 bg-transparent  text-amber-900 pb-6">
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
                // setCartItems([]);
                navigate("/login");
              }}
              className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full"
            >
              Login
            </button>
          ) : (
            <Link to="/Login">
              <button onClick={() => setMenuOpen(false)} className="bg-amber-900 text-white px-4 py-2 rounded-lg hover:bg-amber-800 text-sm transition w-full">
                Log Out
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
