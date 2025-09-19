import Slider from "react-slick";
import type { Settings } from "react-slick";
import { useNavigate, Link } from "react-router-dom";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

import type { Product } from "../type";
import FeaturedCategories from "./FeaturedCategories";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
const newArrivals: Product[] = [
  { id: "1", title: "Nesma", price: 550, image: "/blause1.webp", description: "Blouse", quantity: 1 },
  { id: "2", title: "Princess", price: 1750, image: "/dress5.webp", description: " Dress", quantity: 2 },
  { id: "3", title: "Bisan", price: 1100, image: "/dress11.webp", description: "Dress", quantity: 1 },
  { id: "4", title: "Butterfly Set", price: 1200, image: "/set5.webp", description: " Set", quantity: 1 },
  { id: "12", title: "Layla", price: 600, image: "/basic1.webp", description: "Basicc", quantity: 1 },
  { id: "5", title: "Bascota", price: 1100, image: "/dress22.webp", description: "Dress", quantity: 1 },
  { id: "6", title: "Twilight", price: 750, image: "/jeb2.webp", description: "Skirt", quantity: 1 },
  { id: "7", title: "Flory", price: 1200, image: "/dress25.webp", description: "Dress", quantity: 1 },
  { id: "8", title: "Warda", price: 1000, image: "/dress29.webp", description: "Dress", quantity: 1 },
  { id: "9", title: "Niqap Hoop", price: 450, image: "/img33.webp", description: "Niqap", quantity: 1 },
  { id: "10", title: "Flora", price: 1200, image: "/dress13.webp", description: "Dress", quantity: 1 },
  { id: "11", title: "Lilian", price: 900, image: "/kardy1.webp", description: "Cardi", quantity: 1 },
];

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, cartItems  ,  increaseQuantity,
    decreaseQuantity,} = useCart();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // استرجاع اللغة من localStorage أو استخدام الانجليزية بشكل افتراضي
    const savedLang = localStorage.getItem("language") || "en";

    // تغيير لغة i18n
    i18n.changeLanguage(savedLang);

    // تعديل اتجاه الصفحة حسب اللغة
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const images: string[] = ["/img29.webp", "/img22.webp", "/img30.webp", "/img40.webp", "/img15.webp", "/img26.webp"];
  const isRTL = i18n.language === "ar";
  const settings: Settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    rtl: isRTL,
  };
  return (
    <main className=" min-h-screen  bg-white pt-[60px]">
      {/* ===== Hero Slider ===== */}
      <section className="relative bottom-15  h-[calc(100vh-60px)] ">
        <Slider {...settings} className="h-full w-full">
          {images.map((img, index) => (
            <div key={index} className="h-screen w-full">
              <img src={img} alt={`Slide ${index}`} className="w-full h-full bg-center object-cover" />
            </div>
          ))}
        </Slider>

        <a href="https://wa.me/201114488488" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-white text-green-500 p-4 rounded-full shadow-lg  transition-all z-50">
          <FaWhatsapp size={23} />
        </a>

        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <div className="text-center px-6 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t("eleganceInEveryStitch")}</h1>
            <p className="text-lg md:text-xl mb-6">{t("exploreOurStylishAndModestCollectionNow")}</p>
            <button onClick={() => navigate("/shop")} className="bg-amber-900 hover:bg-amber-800 transition px-6 py-2 text-white cursor-pointer rounded-xl text-sm">
              {t("shopNow")}
            </button>
          </div>
        </div>
      </section>

      {/* ===== Featured Categories Section ===== */}
      <section data-aos="fade-up" className="py-20 px-4 md:px-8  lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">{t("ourFeaturedCategories")}</h2>
        <FeaturedCategories />
      </section>

      {/* ===== New Arrivals Section ===== */}
<section data-aos="fade-up" className="py-16 px-4 md:px-8 lg:px-16 bg-white">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">{t("newArrivals")}</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {newArrivals.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      return (
        <div key={product.id} className="rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
          <div className="cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
            <img src={product.image} alt={t(product.title)} className="w-full h-80 object-cover" />
          </div>
          <div className="p-4">
            {/* العنوان */}
            <h3 className="text-xl font-[cursive] text-amber-900 mb-1">{t(product.title)}</h3>

            {/* الوصف الصغير */}
            <p className="text-gray-500 text-sm mb-2">{t(product.description)}</p>

            {/* السعر */}
            <p className="text-amber-900 text-xl font-bold mb-4">{product.price}{t("currency")}</p>

            {/* التحكم في السلة */}
            {cartItem ? (
              <div className="flex items-center gap-10  rounded-md px-3 py-2">
                <button
                  onClick={() => decreaseQuantity(String(product.id))}
                  className="px-2 py-1 font-bold bg-gray-200"
                >
                  -
                </button>
                <span className="text-lg  font-bold">{cartItem.quantity}</span>
                <button
                  onClick={() => increaseQuantity(String(product.id))}
                  className="px-2 py-1 font-bold bg-gray-200 "
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  addToCart({ ...product, price: Number(product.price), quantity: 1 });
                  toast.success(`${t(product.title)} ${t("addedToCart")}`, {
                    autoClose: 1500,
                    toastId: `cart-${product.id}`,
                  });
                }}
                className="w-full cursor-pointer bg-amber-900 hover:bg-amber-800 text-white py-2 rounded-md font-semibold transition"
              >
                {t("addToCart")}
              </button>
            )}
          </div>
        </div>
      );
    })}
  </div>

  <div className="text-center mt-12">
    <button
      onClick={() => navigate("/shop")}
      className="bg-[#242120] cursor-pointer hover:bg-[#383331] text-white px-8 py-3 rounded-lg text-lg transition"
    >
      {t("viewAllProducts")}
    </button>
  </div>
</section>



      {/* ===== Why Choose Us Section ===== */}
      <section data-aos="fade-up" className="py-16 px-4 md:px-8 lg:px-16 bg-[#f9f4f0]">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">{t("whyChooseUs.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("whyChooseUs.premiumQuality.title")}</h3>
            <p className="text-gray-600">{t("whyChooseUs.premiumQuality.description")}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("whyChooseUs.fastShipping.title")}</h3>
            <p className="text-gray-600">{t("whyChooseUs.fastShipping.description")}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20h5v-2a3 3 0 00-5.356-1.857M2 12v-2a3 3 0 005.356-1.857M2 12v-2a3 3 0 005.356-1.857m0 0a3 3 0 105.356-1.857"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("whyChooseUs.excellentSupport.title")}</h3>
            <p className="text-gray-600">{t("whyChooseUs.excellentSupport.description")}</p>
          </div>
        </div>
      </section>

      {/* ===== Call to Action Section ===== */}
      <section data-aos="fade-up" className="py-16 px-4 md:px-8 lg:px-16 bg-amber-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("callToAction.title")}</h2>
        <p className="text-lg md:text-xl mb-8">{t("callToAction.subtitle")}</p>
        <button onClick={() => navigate("/shop")} className="bg-white text-amber-900 hover:bg-gray-100 transition px-8 py-3 rounded-lg text-lg font-semibold">
          {t("callToAction.buttonText")}
        </button>
      </section>

      {/* ===== Footer Section ===== */}
      <footer data-aos="fade-up" className="bg-white text-gray-800 py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-amber-400">Hoop</h3>
            <p className="text-gray-800 mb-4">{t("footer.companyDescription")}</p>
            <div className="flex space-x-4">
              <Link to="https://www.facebook.com/habeba.shehab" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="h-6 w-6 text-gray-800 transition" />
              </Link>
              <Link to="https://www.instagram.com/hoop_hijab_fashion/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 text-gray-800 transition" />
              </Link>
              <Link to="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="h-6 w-6 text-gray-800 transition" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-800 transition">
                  {t("footer.links.home")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-gray-800  transition">
                  {t("footer.links.shop")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-gray-800  transition">
                  {t("footer.links.aboutUs")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-800  transition">
                  {t("footer.links.contact")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy-policy" className="text-gray-800  transition">
                  {t("footer.links.privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">{t("footer.contactInfo")}</h3>
            <p className="text-gray-800 mb-2">{t("footer.contact.country")}</p>
            <p className="text-gray-800 mb-2">{t("footer.contact.email")}</p>
            <p className="text-gray-800 mb-2">{t("footer.contact.phone")}</p>
            <p className="text-gray-800">{t("footer.contact.workingHours")}</p>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">{t("footer.newsletter.title")}</h3>
            <p className="text-gray-800 mb-4">{t("footer.newsletter.description")}</p>
            <form>
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="w-full p-3 rounded-md bg-[#383331] text-white  focus:outline-none focus:border-amber-400 mb-3"
              />
              <button type="submit" className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-md w-full transition">
                {t("footer.newsletter.subscribe")}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-800 text-sm">
          &copy; {new Date().getFullYear()} Hoop. {t("footer.rightsReserved")}
        </div>
      </footer>
    </main>
  );
}
