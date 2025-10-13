import React from "react";

const SaleSection = () => {
  const categories = [
    {
      title: "Horlage  murale",
      img: "https://www.petitsprix.tn/wp-content/uploads/2022/09/HTB1S4MdKFXXXXaBXXXXq6xXFXXX3.webp",
    },
    {
      title: "Bougies parfumées",
      img: "https://img.freepik.com/photos-gratuite/composition-confortable-tasse-ceramique-bougies-element-tricote_169016-12959.jpg?semt=ais_hybrid&w=740&q=80",
    
    },{
      title: "Lamadoire moderne",
      img: "https://www.lumeers.com/cdn/shop/files/S55b0cbb0bd1b4531b41f3d0837240e03T_800x.webp?v=1710440862",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-gray-100 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80"
          alt="Sale background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-12">
        <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          les modeles en solde
        </h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition">
           Acheter Maintenant
        </button>
      </div>

      {/* Cards grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">
        {categories.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-xl group"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-sm opacity-90">Acheter </p>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SaleSection;