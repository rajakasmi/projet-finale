import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data);
      } catch (err) {
        setError("Impossible de charger les catégories pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-[#b48456] font-semibold animate-pulse">
          Chargement des catégories...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-[#b48456] mb-16 uppercase tracking-widest">
          Catégories DecoStyle
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/categories/${cat.name}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-2">
                {Array.isArray(cat.images) && cat.images.length > 0 ? (
                  cat.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${cat.name} ${index + 1}`}
                      className="w-full h-60 object-cover"
                    />
                  ))
                ) : (
                  <div className="col-span-2 flex items-center justify-center h-60 bg-gray-100 text-gray-400 italic">
                    Image non disponible
                  </div>
                )}
              </div>

              <div className="p-5 text-center">
                <h2 className="text-xl font-semibold text-[#b48456] mb-2">
                  {cat.name}
                </h2>
                <p className="text-gray-700 italic">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
