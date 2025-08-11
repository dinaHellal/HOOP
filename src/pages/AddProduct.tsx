
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: Date.now().toString(),
    title: "",
    price: 0,
    image: "",
    category: "",
    description: "",
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== "admin") {
    return <p className="text-center text-red-600 mt-10">Access Denied</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = [...existingProducts, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    alert("Product added successfully!");
    navigate("/shop");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
