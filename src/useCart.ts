import { useContext } from "react"; // مهم جداً: استيراد useContext
import CartContext from "./CartContext"; // استيراد CartContext

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};