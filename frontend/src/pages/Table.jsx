import React from "react";
import ReactDOM from "react-dom/client";

// Import des images
import table1 from "../assets/table1.jpg";
import table2 from "../assets/table2.jpg";
import table3 from "../assets/table3.jpg"; // ✅ Nouvelle image

// Données des tables
const tables = [
  {
    id: 1,
    img: table1,
    title: "Table basse en bois",
    description: "Une table basse élégante en bois massif, parfaite pour un salon naturel.",
    price: "$200",
  },
  {
    id: 2,
    img: table2,
    title: "Table basse ronde",
    description: "Table basse ronde au design moderne et épuré pour un salon cosy.",
    price: "$180",
  },
  {
    id: 3,
    img: table3,
    title: "Table basse design métal et verre",
    description: "Une table tendance combinant métal et verre pour un intérieur contemporain.",
    price: "$250",
  },
];

const Tables = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Titre principal */}
        <h1 className="text-4xl font-bold text-center text-[#b48456] mb-10">
          Nos Tables Basses
        </h1>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tables.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-[#b48456] mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-700 mb-3">{item.description}</p>
                <p className="text-lg font-semibold text-[#b48456] mb-4">
                  {item.price}
                </p>
                <button className="w-full px-4 py-2 border-2 border-[#b48456] text-[#b48456] rounded-full font-semibold transition-all duration-300 hover:bg-[#b48456] hover:text-white">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tables;

// ✅ Tester directement cette page seule
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Tables />);
