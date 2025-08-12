import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { CustomArrowProps } from "react-slick";

import Slider from "react-slick";
function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full cursor-pointer" onClick={onClick}>
      <FaChevronRight className="text-white" />
    </div>
  );
}
function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full cursor-pointer" onClick={onClick}>
      <FaChevronLeft className="text-white" />
    </div>
  );
}

export default function FeaturedCategories() {
  interface Category {
    name: string;
    image: string;
    link: string;
    id: number;
  }

  const categories: Category[] = [
    { id: 1, name: "Dresses", image: "/img29.webp", link: "/shop?category=derss" },
    { id: 2, name: "Hijab", image: "/img35.webp", link: "/shop?category=scarves" },
    { id: 3, name: "Set", image: "/set1.webp", link: "/shop?category=set" },
    { id: 4, name: "Scirt", image: "/jeb3.webp", link: "/shop?category=scirt" },
    { id: 5, name: "Blouse", image: "/blause4.webp", link: "/shop?category=blousw" },
    { id: 6, name: "Cardigan", image: "/kardy1.webp", link: "/shop?category=blousw" },
    { id: 7, name: "Basic", image: "/basic1.webp", link: "/shop?category=blousw" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="py-16  ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-amber-900">Categories</h2>
        <Slider {...settings}>
          {categories.map((cat) => (
            <a href={cat.link} key={cat.id} className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition mx-2">
              <img src={cat.image} alt={cat.name} className="w-full h-60 object-cover transition-transform group-hover:scale-105" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-amber-900">{cat.name}</h3>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </section>
  );
}
