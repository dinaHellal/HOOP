import Slider from "react-slick";
import type { Settings } from "react-slick";
import { useNavigate } from "react-router-dom";
import FeaturedCategories from "./FeaturedCategories";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const navigate = useNavigate(); // ← التنقل البرمجي

  const images: string[] = [
    "/img15.webp",
    "/img22.webp",
    "/img30.webp",
    "/img40.webp",
    "/img29.webp",
    "/img26.webp",
  ];

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

  return (
    <main className="bg-[#f9f4f0] min-h-screen">
      {/* ===== Hero Slider ===== */}
      <section className="relative h-screen overflow-hidden">
        <Slider {...settings} className="h-screen">
          {images.map((img, index) => (
            <div key={index} className="h-screen w-full">
              <div
                className="h-full w-full bg-center bg-cover"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            </div>
          ))}
        </Slider>

        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center px-6 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Elegance in Every Stitch
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Explore our stylish and modest collection now.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-amber-900 hover:bg-amber-800 transition px-6 py-2 text-white cursor-pointer rounded-xl text-sm"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ===== Featured Categories Section ===== */}
      <FeaturedCategories />
    </main>
  );
}
