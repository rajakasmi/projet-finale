import React from "react";
import { Truck, Star, Shield, Headphones } from "lucide-react";

const features = [
  {
    title: "Livraison rapide",
    description: "Recevez vos articles en un temps record grâce à notre service express.",
    icon: <Truck size={32} className="text-[#b48456]" />,
  },
  {
    title: "Produits exclusifs",
    description: "Découvrez des créations uniques pour embellir votre intérieur.",
    icon: <Star size={32} className="text-[#b48456]" />,
  },
  {
    title: "Qualité garantie",
    description: "Tous nos articles sont soigneusement sélectionnés pour leur qualité.",
    icon: <Shield size={32} className="text-[#b48456]" />,
  },
  {
    title: "Service client",
    description: "Notre équipe est disponible pour répondre à toutes vos questions.",
    icon: <Headphones size={32} className="text-[#b48456]" />,
  },
];

const Features = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#b48456] mb-4">
          Nos Avantages
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Découvrez pourquoi DecoStyle est la référence pour votre décoration intérieure.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
