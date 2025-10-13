import React from "react";


export default function About() {
  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          {/* Image à gauche */}
          <div className="h-full">
            <img
              src="https://img.freepik.com/photos-premium/jeune-homme-noir-accrochant-peinture-mettant-cadre-photo-mur-interieur-decoration-maison-moderne-design-interieur_116547-31134.jpg"
              alt="À propos de DecoStyle"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Texte à droite */}
          <div className="p-10">
            <h2 className="text-4xl font-bold text-[#b48456] mb-6">
              À propos de DecoStyle
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Chez <strong>DecoStyle</strong>, nous croyons que chaque maison
              mérite d’être un lieu unique, inspirant et à votre image.  
              Nous proposons une sélection soignée d’articles de décoration,
              de luminaires et d’objets design alliant qualité, élégance et
              authenticité.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Notre mission est simple : rendre la décoration intérieure
              accessible à tous, tout en valorisant le savoir-faire artisanal et
              les matériaux durables. Que vous soyez amateur de design moderne,
              de style bohème ou d’ambiance naturelle, DecoStyle vous accompagne
              pour transformer votre intérieur.
            </p>

            <div className="bg-[#b48456] text-white rounded-lg p-6 mt-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-3">Notre Engagement</h3>
              <ul className="space-y-2 text-lg">
                <li>✅ Produits de qualité supérieure</li>
                <li>🌿 Matériaux durables et respectueux de l’environnement</li>
                <li>💬 Service client à l’écoute</li>
                <li>🚚 Livraison rapide et sécurisée</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section équipe ou valeurs */}
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Une équipe passionnée par la décoration
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Derrière DecoStyle se cache une équipe de créateurs, designers et
          artisans passionnés, partageant la même vision :  
          faire de votre espace de vie un lieu d’harmonie, de confort et de
          beauté.
        </p>
      </div>
    </section>
  );
}
