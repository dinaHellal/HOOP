/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { Product } from "../type";

type CartContextType = {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
    clearCart: () => void;            // ✅ أضيفي هذا السطر

};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const parsed = JSON.parse(storedCart);
    if (Array.isArray(parsed) && parsed.length > 0) {
      setCartItems(parsed);
    }
  }
}, []);


  useEffect(() => {

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };



  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart , clearCart: () => setCartItems([]) }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
export default CartContext;