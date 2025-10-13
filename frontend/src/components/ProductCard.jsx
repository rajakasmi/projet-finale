// import React, { useState } from "react";

// // Produits exemple pour DecoStyle (remplace les URLs par tes images)
// const products = [
//   {
//     id: 1,
//     category: "Luminaires",
//     images: [
//       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
//       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=60",
//     ],
//     description: "Lampe design moderne en métal doré, idéale pour salon ou chambre.",
//   },
//   {
//     id: 2,
//     category: "Luminaires",
//     images: [
//       "https://www.cdiscount.com/pdt2/9/5/9/1/700x700/auc9328426900959/rw/lustre-suspension-moderne-salon-sayoo-o24cm-3-cag.jpg",
//       "https://m.media-amazon.com/images/I/61RiwMDuP3L._UF1000,1000_QL80_.jpg",
//     ],
//     description: "Suspension élégante en verre pour éclairer votre salon avec style.",
//   },
//   {
//     id: 3,
//     category: "Décoration murale",
//     images: [
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
//       "https://m.media-amazon.com/images/I/81aAVEeq9PS._UF1000,1000_QL80_.jpg",
//     ],
//     description: "Tableau mural abstrait aux couleurs chaudes pour décorer votre intérieur.",
//   },
//   {
//     id: 3,
//     category: "Décoration murale",
//     images: [
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
//       "https://www.cdiscount.com/pdt2/2/2/1/1/700x700/unh1687174620221/rw/miroir-decoration-rond-miroir-mural-decoratif-salo.jpg",
//     ],
//     description: "  Miroir rond avec cadre en bois naturel pour une touche élégante.",
//   },
//   {
//     id: 4,
//     category: "Objets déco",
//     images: [
//       "https://images.unsplash.com/photo-1616627564274-d8c09f74b5fc?auto=format&fit=crop&w=600&q=80",
//       "https://www.lumeers.com/cdn/shop/files/S73321a2494fc46bab8ae515c27d83e7aJ_800x.webp?v=1739361085",
//     ],
//     description: "Bougie parfumée artisanale pour créer une ambiance cosy.",
//   },
// ];

// const categories = ["Tous", "Luminaires", "Décoration murale", "Objets déco"];

// const ProductCards = () => {
//   const [selectedCategory, setSelectedCategory] = useState("Tous");

//   const filteredProducts =
//     selectedCategory === "Tous"
//       ? products
//       : products.filter((p) => p.category === selectedCategory);

//   return (
//     <section className="bg-gray-50 min-h-screen py-24">
//       <div className="max-w-7xl mx-auto px-6 text-center mb-12">
//         <h2 className="text-4xl md:text-5xl font-bold text-[#b48456] mb-4">
//           Nos Produits
//         </h2>
//         <p className="text-gray-700 max-w-2xl mx-auto">
//           Découvrez notre sélection d'articles exclusifs pour embellir votre intérieur.
//         </p>
//       </div>

//       {/* Filtres catégories */}
//       <div className="flex justify-center gap-4 mb-10 flex-wrap">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-5 py-2 rounded-full font-semibold transition ${
//               selectedCategory === cat
//                 ? "bg-[#b48456] text-white"
//                 : "border-2 border-[#b48456] text-[#b48456] hover:bg-[#b48456] hover:text-white"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Grille des produits */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 duration-300"
//           >
//             <div className="relative w-full h-64">
//               <img
//                 src={product.images[0]}
//                 alt="Produit"
//                 className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-0 absolute top-0 left-0"
//               />
//               <img
//                 src={product.images[1]}
//                 alt="Produit"
//                 className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-100 absolute top-0 left-0"
//               />
//             </div>
//             <div className="p-6 text-center">
//               <p className="text-gray-700 mb-4">{product.description}</p>
//               <button className="px-5 py-2 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full transition-all duration-300 hover:bg-[#b48456] hover:text-white">
//                 Ajouter au panier
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProductCards;

import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#b48456]">
            ${product.price}
          </span>
          <button className="bg-[#b48456] hover:bg-[#a17448] text-white px-4 py-2 rounded-lg transition-all">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
