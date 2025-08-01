import Slider from "react-slick";
import type { Settings } from "react-slick";
import { useNavigate, Link } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { Product } from "../type";
import FeaturedCategories from "./FeaturedCategories";

interface HomeProps {
  addToCart: (product: Product) => void;
}

const newArrivals: Omit<Product, "quantity">[] = [
  { id: 1, name: "Elegant Dress", price: "1000 EGP", image: "/img25.webp" },
  { id: 2, name: "Classic Dress", price: "1000 EGP", image: "/img45.webp" },
  { id: 3, name: "Modern Abaya", price: "1000 EGP", image: "/img8.webp" },
  { id: 4, name: "Stylish Cardigan", price: "1000 EGP", image: "/img15.webp" },
];

const testimonials = [
  {
    id: 1,
    quote: "Excellent quality and unique designs! Great shopping experience.",
    author: "فاطمة أحمد",
    image: "/img1.webp",
  },
  {
    id: 2,
    quote: "Fast delivery and excellent customer service. I loved the product very much.",
    author: "ليلى محمود",
    image: "/img8.webp",
  },
  {
    id: 3,
    quote: "Modern and modest fashion. I will definitely order again!",
    author: "مريم علي",
    image: "/img18.webp",
  },
];

export default function Home({ addToCart }: HomeProps) {
  const navigate = useNavigate();

  const images: string[] = ["/img10.webp", "/img22.webp", "/img30.webp", "/img40.webp", "/img29.webp", "/img26.webp"];

  const settings: Settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  };

  const testimonialSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <main className=" min-h-screen pt-[60px]">
      {/* ===== Hero Slider ===== */}
      <section className="relative bottom-15 h-[calc(100vh-60px)] overflow-visible">
        <Slider {...settings} className="h-full w-full ">
          {images.map((img, index) => (
            <div key={index} className="h-screen w-full ">
              <img src={img} alt={`Slide ${index}`} className="w-full h-full bg-center object-cover" />
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <div className="text-center px-6 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Elegance in Every Stitch</h1>
            <p className="text-lg md:text-xl mb-6">Explore our stylish and modest collection now.</p>
            <button onClick={() => navigate("/shop")} className="bg-amber-900 hover:bg-amber-800  transition px-6 py-2 text-white cursor-pointer rounded-xl text-sm">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ===== Featured Categories Section ===== */}
      <section className="py-19 px-4 md:px-8  lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Our Featured Categories</h2>
        <FeaturedCategories />
      </section>

      {/* ===== New Arrivals Section ===== */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-lg mb-4">{product.price}</p>
                <button
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                  className="bg-amber-900 hover:bg-amber-800 text-white px-5 py-2 rounded-lg text-sm transition flex items-center justify-center gap-2 mx-auto"
                >
                  <FiShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => navigate("/shop")} className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg transition">
            View All Products
          </button>
        </div>
      </section>

      {/* ===== Why Choose Us Section ===== */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#f9f4f0]">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
            <p className="text-gray-600">We source only the finest fabrics and materials.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Receive your order quickly and reliably.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-amber-900 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20h5v-2a3 3 0 00-5.356-1.857M2 12v-2a3 3 0 005.356-1.857M2 12v-2a3 3 0 005.356-1.857m0 0a3 3 0 105.356-1.857"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Excellent Support</h3>
            <p className="text-gray-600">Our team is always here to help you.</p>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">What Our Customers Say</h2>
        <Slider {...testimonialSettings} className="max-w-3xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="text-center px-4">
              <div className="bg-[#f9f4f0] p-8 rounded-lg shadow-md">
                <p className="text-gray-700 text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center justify-center mb-4">
                  <img src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <p className="font-semibold text-gray-800 text-xl">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ===== Call to Action Section ===== */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-amber-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Style?</h2>
        <p className="text-lg md:text-xl mb-8">Discover your perfect look with our diverse collection.</p>
        <button onClick={() => navigate("/shop")} className="bg-white text-amber-900 hover:bg-gray-100 transition px-8 py-3 rounded-lg text-lg font-semibold">
          Start Shopping Now
        </button>
      </section>

      {/* ===== Footer Section ===== */}
      <footer className="bg-gray-800 text-white py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-amber-400">Hoop</h3>
            <p className="text-gray-400 mb-4">Elegance in Every Stitch. Discover our stylish and modest collection.</p>
            {/* ✅ Corrected: Lines 252-256 - Social Icons */}
            <div className="flex space-x-4">
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="h-6 w-6 text-gray-400 hover:text-white transition" />
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="h-6 w-6 text-gray-400 hover:text-white transition" />
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 text-gray-400 hover:text-white transition" />
              </Link>
              <Link to="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="h-6 w-6 text-gray-400 hover:text-white transition" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" className="text-gray-400 hover:text-white transition">
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <p className="text-gray-400 mb-2">123 Fashion St, Cairo, Egypt</p>
            <p className="text-gray-400 mb-2">Email: info@hoop.com</p>
            <p className="text-gray-400 mb-2">Phone: +20 123 456 7890</p>
            <p className="text-gray-400">Working Hours: Mon-Fri, 9AM - 6PM</p>
          </div>

          {/* Newsletter (Optional) */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest collections and offers.</p>
            <form>
              <input type="email" placeholder="Your email address" className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-amber-400 mb-3" />
              <button type="submit" className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-md w-full transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-400 text-sm">&copy; {new Date().getFullYear()} Hoop. All rights reserved.</div>
      </footer>
    </main>
  );
}
