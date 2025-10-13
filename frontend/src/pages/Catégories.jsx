import React from "react";
import ReactDOM from "react-dom/client";

// ✅ Import des images
import luminaire1 from "../assets/luminaire1.jpg";
import luminaire2 from "../assets/luminaire2.jpg";
import murale1 from "../assets/murale1.jpg";
import murale2 from "../assets/murale2.jpg";
import objet1 from "../assets/objet1.jpg";
import objet2 from "../assets/objet2.jpg";

// ✅ Données des catégories
const categories = [
  {
    id: 1,
    name: "Luminaires",
    imgs: [luminaire1, luminaire2],
    description:
      "Apportez une lumière douce et design à vos espaces avec nos luminaires modernes.",
  },
  {
    id: 2,
    name: "Décoration Murale",
    imgs: [murale1, murale2],
    description:
      "Transformez vos murs en œuvres d’art grâce à notre sélection murale unique.",
  },
  {
    id: 3,
    name: "Objets Déco",
    imgs: [objet1, objet2],
    description:
      "Sublimez votre intérieur avec des objets déco élégants et pleins de caractère.",
  },
];

const Categories= () => {
  return (
    <div className="bg-[#f8f8f8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Titre principal */}
        <h1 className="text-4xl font-bold text-center text-[#b48456] mb-16 uppercase tracking-widest">
          Catégories DecoStyle
        </h1>

        {/* ✅ Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* ✅ Deux images côte à côte */}
              <div className="grid grid-cols-2">
                {cat.imgs.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${cat.name} ${index + 1}`}
                    className="w-full h-60 object-cover"
                  />
                ))}
              </div>

              {/* ✅ Description simple */}
              <div className="p-5 text-center">
                <p className="text-gray-700 italic">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

// ✅ Test local (à supprimer si tu utilises React Router)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Categories />);
