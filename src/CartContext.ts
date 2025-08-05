import { createContext } from "react";
import type { Product } from "./type"; // تأكد من المسار الصحيح لنوع Product

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number; // العدد الإجمالي للعناصر في السلة
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
});

export default CartContext;