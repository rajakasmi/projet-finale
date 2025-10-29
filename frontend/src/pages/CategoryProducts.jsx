import React, { useEffect, useState } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("Tous");
  const [showOnSale, setShowOnSale] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sub = params.get("sub");
    const sale = params.get("sale");
    setSelectedSubCategory(sub || "Tous");
    setShowOnSale(sale === "true");
  }, [location.search]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/by-category?category=${categoryName}`
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        setError("Aucun produit trouvé pour cette catégorie.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [categoryName]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedSubCategory !== "Tous") {
      filtered = filtered.filter((p) => p.subCategory === selectedSubCategory);
    }

    if (showOnSale) {
      filtered = filtered.filter((p) => p.onSale === true);
    }

    setFilteredProducts(filtered);
  }, [selectedSubCategory, showOnSale, products]);

  const subCategories = ["Tous", ...new Set(products.map((p) => p.subCategory))];

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#b48456] animate-pulse text-lg">
          Chargement des produits...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-[#b48456] mb-10 uppercase">
          {categoryName}
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {subCategories.map((subCat) => (
            <button
              key={subCat}
              onClick={() => setSelectedSubCategory(subCat)}
              className={`px-5 py-2 rounded-full border transition-all ${
                selectedSubCategory === subCat
                  ? "bg-[#b48456] text-white border-[#b48456]"
                  : "border-gray-300 text-gray-600 hover:border-[#b48456]"
              }`}
            >
              {subCat}
            </button>
          ))}

          <button
            onClick={() => setShowOnSale(!showOnSale)}
            className={`px-5 py-2 rounded-full border transition-all ${
              showOnSale
                ? "bg-[#b48456] text-white border-[#b48456]"
                : "border-gray-300 text-gray-600 hover:border-[#b48456]"
            }`}
          >
            En solde uniquement
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Aucun produit trouvé pour cette sélection.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <img
                  src={p.images?.[0] || "https://via.placeholder.com/300"}
                  alt={p.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-semibold text-[#b48456]">
                    {p.name}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {p.description}
                  </p>
                  <p className="text-[#b48456] mt-3 font-bold">
                    {p.onSale && p.salePrice
                      ? `${p.salePrice} DT (promo)`
                      : `${p.price} DT`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}