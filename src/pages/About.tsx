import { FaWhatsapp } from "react-icons/fa";

export default function About() {

  return (
    <div className="max-w-5xl mt-15 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <a
        href="https://wa.me/201004466279"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-white text-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
      >
        <FaWhatsapp size={23} />
      </a>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        Welcome to <span className="font-semibold">Hoop</span> – your go-to destination for modern and stylish women's fashion. Our mission is to bring you the latest trends, top-quality fabrics, and
        unique designs that make you feel confident and beautiful.
      </p>

      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        Founded with love and passion for fashion, Hoop is more than just a store – it’s a place where every woman can find her own style. Whether you’re looking for casual wear, evening outfits, or
        accessories, we’ve got you covered.
      </p>

      <p className="text-lg leading-relaxed text-gray-700">Thank you for choosing us. We’re excited to be part of your style journey!</p>
    </div>
  );
}
