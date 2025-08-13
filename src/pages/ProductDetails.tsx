import { useParams } from "react-router-dom";
import { products } from "../Products";
import { useCart } from "../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRatings } from "../useRatings";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { rating, count, handleRate } = useRatings(product?.title ?? "");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  if (!product) {
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        {t("productNotFound")}
      </div>
    );
  }

  const photos =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    rtl: i18n.language === "ar",
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 flex flex-col lg:flex-row gap-20">
      {/* Slider */}
      <div className="w-full lg:w-[450px]">
        <Slider {...Settings}>
          {photos.map((img, index) => (
            <div key={index} className="h-[350px] sm:h-[400px]">
              <img
                src={img}
                alt={product.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Details */}
      <div className="flex-1 mt-10">
        <h2 className="text-3xl font-bold text-amber-900">{product.title}</h2>
        <p className="mt-4 text-gray-700">{product.description}</p>

        {/* Rating */}
        <div className="mt-6">
          <p className="mb-2 font-semibold">{t("rateProduct")}</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => {
                  handleRate(star);
                  toast.success(t("thankYouForRating"));
                }}
                className={`cursor-pointer text-2xl ${
                  star <= Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-sm ml-2 text-gray-600">
              {rating.toFixed(1)} ({count})
            </span>
          </div>
        </div>

        <p className="mt-4 text-2xl text-amber-800 font-bold">
          {product.price} {t("currency")}
        </p>
        <button
          onClick={() => {
            addToCart(product);
            toast.success(t("addedToCart", { product: product.title }), {
              autoClose: 2000,
              toastId: `cart-${product.id}`,
            });
          }}
          className="cart text-white bg-amber-900 p-3 px-20 mt-4 rounded-2xl flex gap-4 text-center text-xl"
        >
          <FiShoppingCart />
          {t("addToCart")}
        </button>
      </div>
    </div>
  );
}
