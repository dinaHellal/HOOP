export default function FeaturedCategories() {
  interface Category {
    name: string;
    image: string;
    link: string;
    id: number;
  }

  const categories: Category[] = [
    {
      id: 1,
      name: "Dresses",
      image: "/img29.webp",
      link: "/shop?category=derss",
    },
    {
      id: 2,
      name: "Hijab",
      image: "/img35.webp",
      link: "/shop?category=scarves",
    },
    {
      id: 3,
      name: "set",
      image: "/set1.webp",
      link: "/shop?category=set",
    },
    {
      id: 4,
      name: "Scirt",
      image: "/jeb3.webp",
      link: "/shop?category=scirt",
    },
    {
      id: 5,
      name: "Blouse",
      image: "/blause4.webp",
      link: "/shop?category=blousw",
    },
  ];
  return (
    <section className="py-16 bg-white ">
      
      <div className="container mx-auto px-4 ">
        <h2 className="text-3xl font-bold text-center mb-10 text-amber-900">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6  gap-5">
          {categories.map((cat, index) => (
            <a href={cat.link} key={index} className="group bg-white rounded-xl  overflow-hidden hover:shadow-lg transition">
              <img src={cat.image} alt={cat.name} className="w-200 h-60 object-cover transition-transform group-hover:scale-105" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-amber-900">{cat.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
