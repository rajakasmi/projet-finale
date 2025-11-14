import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function ProductList() {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/products/${category}/${subcategory}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement produits :", err);
        setLoading(false);
      });
  }, [category, subcategory]);

  return (
    <div className="min-h-screen bg-[#fffaf3] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#b48456] mb-8 capitalize">
          {subcategory ? subcategory.replace("-", " ") : category}
        </h2>

        {loading ? (
          <p className="text-gray-600 text-lg">Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600 text-lg">
            Aucun produit trouvé pour cette catégorie.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={
                    product.image
                      ? product.image
                      : "https://via.placeholder.com/300x200?text=Image+non+disponible"
                  }

                  alt={product.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <p className="text-[#b48456] font-bold text-lg">
                    {product.price} €
                  </p>

                  <div className="mt-3 flex justify-between items-center">
                    <button className="bg-[#b48456] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#9a6d3c] transition">
                      Ajouter au panier
                    </button>
                    <button className="text-[#b48456] font-medium text-sm hover:underline">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}