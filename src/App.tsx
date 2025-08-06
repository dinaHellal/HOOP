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
import Tracking from "./pages/Tracking";
import AdminLogin from "./admin/AdminLogin";
import AdminOrders from "./admin/AdminOrders";

function App() {
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
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank" element={<Thank />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
      </Routes>

      <ToastContainer />
    </CartProvider>
  );
}

export default App;
