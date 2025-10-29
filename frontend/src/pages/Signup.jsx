import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Gérer les changements d'inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Soumettre le formulaire à l’API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de l’inscription");
      }

      toast.success("✅ Compte créé avec succès !");
      navigate("/signin"); // Redirige vers la page login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden w-[90%] max-w-4xl">
        {/* Section Image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://cdn-images.farfetch-contents.com/18/26/96/21/18269621_39540539_600.jpg"
            alt="Inscription"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Section Formulaire */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center text-[#b48456] mb-6">
              Créer un compte
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom complet */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
                />
              </div>

              {/* Erreur */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 px-5 py-2 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full transition-all duration-300 hover:bg-[#b48456] hover:text-white disabled:opacity-50"
              >
                {loading ? "Création du compte..." : "S'inscrire"}
              </button>
            </form>

            {/* Lien vers login */}
            <p className="text-sm text-center text-gray-500 mt-6">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/signin"
                className="text-[#b48456] hover:underline font-semibold"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />  
    </div>
  );
}
