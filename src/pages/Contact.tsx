import  { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const whatsappNumber = "201004466279"; 

  const handleSend = () => {
    if (!name || !message) {
      alert("Please fill in all fields");
      return;
    }
    const url = `https://wa.me/${whatsappNumber}?text=Hello, my name is ${encodeURIComponent(
      name
    )}.%0A${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b  to-white p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full ">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-amber-900 text-center mb-6">
          Fill in the form below to send us a message on WhatsApp
        </p>

        <div className="mb-4">
          <label className="block text-amber-900 mb-2 font-medium">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border outline-none rounded-lg   "
          />
        </div>

        <div className="mb-6">
          <label className="block text-amber-900 mb-2 font-medium">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none "
          ></textarea>
        </div>

        <button
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 bg-amber-900 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
        >
          <FaWhatsapp className="text-xl" /> Send on WhatsApp
        </button>
      </div>
    </div>
  );
}
