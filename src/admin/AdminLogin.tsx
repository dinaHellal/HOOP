import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "habiba2030") {
      localStorage.setItem("admin_logged_in", "true");
      toast.success("Logged in Successfully");
      navigate("/admin-orders");
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="flex items-center mt-15 justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border p-3 rounded w-full mb-3"
        />
        <button onClick={handleLogin} className="bg-amber-900 w-full text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
