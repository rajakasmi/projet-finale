import React, { useState, useEffect } from "react";

const slides = [
  {
    src: "https://cache.marieclaire.fr/data/photo/w1000_ci/6d/objet-deco-a-poser-tendance.jpg",
    title: "Meilleure Décoration",
    description:
      "Apportez une touche d'élégance à votre intérieur avec nos décorations exclusives.",
    button: "Découvrir",
  },
  {
    src: "https://m.media-amazon.com/images/I/71nkJsBocGS._AC_SL1500_.jpg",
    title: "Feuilles Murales",
    description:
      "Transformez vos murs avec des décorations modernes et uniques.",
    button: "Voir plus",
  },
  {
    src: "https://m.media-amazon.com/images/I/51SCAO+YwFS._UF1000,1000_QL80_.jpg",
    title: "Style & Élégance",
    description:
      "Découvrez l’harmonie parfaite entre design et raffinement.",
    button: "Explorer",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 73px)" }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mb-6 leading-relaxed">
              {slide.description}
            </p>
            <button className="px-8 py-3 bg-[#b48456] text-white rounded-full font-semibold hover:bg-[#a07346] transition duration-300 shadow-lg hover:shadow-2xl">
              {slide.button}
            </button>
          </div>
        </div>
      ))}

      {/* Flèches de navigation */}
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

      {/* Points de navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-300 ${
              current === index
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
