import React, { useState, useEffect } from "react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

const carouselItems = [
  {
    img: image1,
    title: "Fauteuil moderne",
    description: "Un fauteuil confortable pour votre salon.",
    price: "$120",
  },
  {
    img: image2,
    title: "Tableau abstrait",
    description: "Tableau moderne pour décorer vos murs.",
    price: "$250",
  },
  {
    img: image3,
    title: "Miroir rond",
    description: "Miroir décoratif pour embellir vos murs.",
    price: "$450",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Changement automatique de slide toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {/* Slide Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-10">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={carouselItems[current].img}
            alt={carouselItems[current].title}
            className="w-full h-96 md:h-[500px] object-cover rounded-xl shadow-md transform transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Description */}
        <div className="w-full md:w-1/2 text-center md:text-left text-white md:text-black p-5 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b48456] mb-4">
            {carouselItems[current].title}
          </h2>
          <p className="text-lg md:text-xl mb-4">{carouselItems[current].description}</p>
          <p className="text-2xl font-semibold text-[#b48456] mb-6">
            {carouselItems[current].price}
          </p>
          <button className="px-6 py-3 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full transition-all duration-300 hover:bg-[#b48456] hover:text-white">
            Acheter maintenant
          </button>
        </div>
      </div>

      {/* Contrôles */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#b48456]/80 text-white rounded-full p-3 hover:bg-[#b48456] transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#b48456]/80 text-white rounded-full p-3 hover:bg-[#b48456] transition"
      >
        ❯
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              current === index ? "bg-[#b48456]" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
