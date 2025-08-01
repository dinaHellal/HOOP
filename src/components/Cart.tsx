// Cart.tsx

// يفضل تعريف Product interface في ملف منفصل (مثل types.ts)
// واستيراده هنا وفي App.tsx
interface Product {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity?: number;
}

// تعريف الـ Interface للـ props اللي Cart بيستقبلها
interface CartProps {
  cartItems: Product[];
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, newQuantity: number) => void;
}

// استقبل الـ props بالـ interface بتاعها
export default function Cart({ cartItems, removeFromCart, updateQuantity }: CartProps) {
  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
              <input
                type="number"
                min="1"
                value={item.quantity || 1}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}