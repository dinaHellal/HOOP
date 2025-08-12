


export default function FeaturedCategories() {
  interface Category {
  name: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    name: "Abaya",
    image: "/img1.webp",
    link: "/shop?category=abayas",
  },
  {
    name: "Dresses",
    image: "/img29.webp",
    link: "/shop?category=dresses",
  },
  {
    name: "Niqab",
    image: "/img35.webp",
    link: "/shop?category=scarves",
  },
];
  return (
    <section className="py-16 bg-[#f9f4f0]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-amber-900">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <a
              href={cat.link}
              key={index}
              className="group bg-white rounded-xl  overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-100 object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-amber-900">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
