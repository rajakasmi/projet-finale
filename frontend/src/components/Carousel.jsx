import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const { products, loading } = useData();
  const navigate = useNavigate();
  const featuredProducts = products.filter((p) => p.featured === true);
  const [current, setCurrent] = useState(0);
  const length = featuredProducts.length;

  useEffect(() => {
    if (length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  if (loading) return <div className="h-[80vh] flex items-center justify-center">Chargement...</div>;
  if (length === 0) return <div className="h-[80vh] flex items-center justify-center">Aucun produit en vedette</div>;

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 73px)" }}>
      {featuredProducts.map((product, index) => (
        <div
          key={product._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
          <img
            src={product.images?.[0] || "https://via.placeholder.com/1200x600"}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
              {product.name}
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mb-6 leading-relaxed">
              {product.description}
            </p>
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="px-8 py-3 bg-[#b48456] text-white rounded-full font-semibold hover:bg-[#a07346] transition duration-300 shadow-lg hover:shadow-2xl"
            >
              Découvrir
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-[#b48456]/70 hover:bg-[#b48456] text-white rounded-full p-3 transition shadow-lg"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-[#b48456]/70 hover:bg-[#b48456] text-white rounded-full p-3 transition shadow-lg"
      >
        ❯
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {featuredProducts.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-300 ${current === index
                ? "bg-[#b48456] scale-110"
                : "bg-white/60 hover:bg-[#b48456]/60"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
