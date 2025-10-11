import React from "react";
import fauteuil1 from "../assets/fauteuil1.jpg";
import fauteuil2 from "../assets/fauteuil2.jpg";
import fauteuil3 from "../assets/fauteuil3.jpg";

const fauteuils = [
  { img: fauteuil1, fauteuil3 ,title: "Fauteuil Moderne", price: "120 $" },
  { img: fauteuil2, title: "Fauteuil Scandinave", price: "180 $" },
  { img: fauteuil3, title: "Fauteuil Classique", price: "150 $" },
];

const FauteuilsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center text-[#b48456] mb-10">
        Nos Fauteuils
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10">
        {fauteuils.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <p className="text-[#b48456] font-bold mt-2">{item.price}</p>
              <button className="mt-4 px-5 py-2 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full transition-all duration-300 hover:bg-[#b48456] hover:text-white">
                Acheter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FauteuilsPage;
