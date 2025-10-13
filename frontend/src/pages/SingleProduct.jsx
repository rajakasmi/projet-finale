import React from "react";

export default function ProductDetail() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen pt-32 pb-16">
      {/* ↑ pt-32 = marge haute pour laisser la place à la Navbar fixée */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* ----- IMAGE PRODUIT ----- */}
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden shadow-lg">
              <img
                className="w-full h-full object-cover"
                src="https://img.freepik.com/photos-gratuite/design-vase-moderne-elegant_23-2150529721.jpg?semt=ais_incoming&w=740&q=80"
                alt="Produit DecoStyle"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-[#b48456] text-white py-2 px-4 rounded-full font-semibold hover:bg-[#a37245] transition">
                  Ajouter au panier
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  Ajouter aux favoris
                </button>
              </div>
            </div>
          </div>

          {/* ----- DÉTAILS PRODUIT ----- */}
          <div className="md:flex-1 px-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Vase en céramique artisanal
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
              Ce vase élégant en céramique apportera une touche naturelle et moderne à votre intérieur. 
              Fabriqué à la main, chaque pièce est unique et ajoute une note d’authenticité à votre décoration.
            </p>

            <div className="flex mb-4">
              <div className="mr-6">
                <span className="font-bold text-gray-700 dark:text-gray-300">Prix :</span>
                <span className="ml-2 text-gray-800 dark:text-gray-200 font-semibold">49.99 €</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Disponibilité :</span>
                <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">En stock</span>
              </div>
            </div>

            {/* Couleurs */}
            <div className="mb-6">
              <span className="font-bold text-gray-700 dark:text-gray-300">Choisir une couleur :</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-[#b48456] mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-400 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-green-500 mr-2"></button>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Description du produit :</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">
                Ce vase est idéal pour sublimer vos fleurs séchées ou fraîches. 
                Son design minimaliste s’intègre parfaitement dans tout type d’intérieur — scandinave, bohème ou contemporain. 
                Disponible en plusieurs coloris pour s’adapter à vos envies déco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
