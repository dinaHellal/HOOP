import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../Products";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRatings } from "../useRatings";

export default function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [current, setCurrent] = useState(0);
const { rating, count, handleRate } = useRatings(product?.title ?? "");

  if (!product) {
    return <div className="text-center py-20 text-red-600 text-xl">Product not found</div>;
  }

  const photos = product.images && product.images.length > 0 ? product.images : [product.image];

  const next = () => setCurrent((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrent((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 flex flex-col lg:flex-row gap-10">
      {/* Slider */}
      <div className="relative w-full lg:w-[450px] h-[350px] sm:h-[400px] overflow-hidden rounded-xl">
        <img src={photos[current]} alt={product.title} className="w-full h-full object-cover transition duration-300" />
        {photos.length > 1 && (
          <>
            <button onClick={prev} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full">
              ‹
            </button>
            <button onClick={next} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 px-3 py-1 rounded-full">
              ›
            </button>
          </>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 mt-10">
        <h2 className="text-3xl font-bold text-amber-900">{product.title}</h2>
        <p className="mt-4 text-gray-700">{product.description}</p>
<div className="mt-35">
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map((star) => (
      <span
        key={star}
        onClick={() => {
          handleRate(star);
          toast.success("Thank you for rating!");
        }}
        className={`cursor-pointer text-2xl ${
          star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ))}

    {/* display average + count */}
    <span className="text-sm ml-2 text-gray-600">
      {rating.toFixed(1)} ({count})
    </span>
  </div>
</div>
        <p className="mt- text-2xl text-amber-800 font-bold">${product.price}</p>
        <button
          onClick={() => {
            addToCart(product);
            toast.success(`${product.title} added to cart!`, {
              autoClose: 2000,
              hideProgressBar: false,
              toastId: `cart-${product.id}`,
            });
          }}
          className="cart text-white bg-amber-900 p-3 mt-2 rounded-2xl  flex gap-4 text-center text-xl"
        >
          <FiShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
}
