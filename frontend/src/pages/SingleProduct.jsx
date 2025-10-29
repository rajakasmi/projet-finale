import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
   const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // ✅ Si ton API renvoie tous les produits :
        const res = await axios.get("http://127.0.0.1:5000/api/products");

        // ✅ Trouver le produit avec le même ID que celui dans l’URL
        const foundProduct = res.data.find((p) => p._id === id);

        if (!foundProduct) {
          setError("Produit introuvable !");
        } else {
          setProduct(foundProduct);
        }
      } catch (err) {
        setError("Erreur lors du chargement du produit !");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#b48456] text-lg animate-pulse">
          Chargement du produit...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#b48456] text-white px-4 py-2 rounded-full hover:bg-[#a37245]"
        >
          Retour
        </button>
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Aucun produit trouvé.</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* IMAGE */}
          <div className="md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="h-[450px] rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* DÉTAILS */}
          <div className="md:w-1/2 px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* PRIX */}
            <div className="mb-4">
              <span className="font-bold text-gray-700">Prix :</span>{" "}
              <span className="text-gray-800 text-lg font-semibold">
                {product.price ? `${product.price} DT` : "Non disponible"}
              </span>
            </div>

            {/* MATIÈRE */}
            <div className="mb-4">
              <span className="font-bold text-gray-700">Matière :</span>{" "}
              <span className="text-gray-600">
                {product.material || "Non spécifiée"}
              </span>
            </div>

            {/* COULEUR */}
            <div className="mb-4">
              <span className="font-bold text-gray-700">Couleur :</span>{" "}
              <span className="text-gray-600">
                {product.color || "Non spécifiée"}
              </span>
            </div>

            {/* STOCK */}
            <div className="mb-6">
              <span className="font-bold text-gray-700">Disponibilité :</span>{" "}
              <span
                className={`font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? "En stock" : "Rupture"}
              </span>
            </div>

            {/* BOUTONS */}
            <div className="flex gap-4">
              <button
               onClick={() => addToCart({...product ,id: product._id} )}
              className="bg-[#b48456] text-white px-6 py-2 rounded-full hover:bg-[#a37245] transition">
                Ajouter au panier
              </button>
              <button

                onClick={() => navigate(-1)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              >
                ← Retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
