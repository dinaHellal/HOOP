import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image: string;
  categoryId: number;
}

const products: Product[] = [
  { id: 1, name: "Dress 1", image: "/img29.webp", categoryId: 1 },
  { id: 2, name: "Dress 2", image: "/img30.webp", categoryId: 1 },
  { id: 3, name: "Dress 3", image: "/img31.webp", categoryId: 1 },
  { id: 4, name: "Dress 4", image: "/img32.webp", categoryId: 1 },
  { id: 5, name: "Hijab 1", image: "/img35.webp", categoryId: 2 },
    { id: 4, name: "Set 1", image: "/set1.webp", categoryId: 3 },
  { id: 5, name: "Skirt 1", image: "/jeb3.webp", categoryId: 4 },
  { id: 6, name: "Blouse 1", image: "/blause4.webp", categoryId: 5 },
];

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Category Products</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{product.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </div>
  );
}
