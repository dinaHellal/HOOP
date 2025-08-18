import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "./components/Banner";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Thank from "./components/Thank";
import AdminLogin from "./admin/AdminLogin";
import AdminOrders from "./admin/AdminOrders";
import CategoryPage from "./pages/CategoryPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
    useEffect(() => {
    AOS.init({
      duration: 2000, 
      easing: "ease-in-out", 
      once: false, 
    });
  }, []);
  return (
    <CartProvider>
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
              <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank" element={<Thank />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
                <Route path="/product/:id" element={<ProductDetails />} /> 

      </Routes>
      <ToastContainer />
    </CartProvider>
  );
}

export default App;
