import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, getProfile, updateProfile } = useAuth();
  const [name, setName] = useState(""); // Nom complet
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {

  const fetchProfile = async () => {
    const data = await getProfile();
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setImage(data.image || "");
    }
    setLoading(false);
  };
  fetchProfile();
}, [])

  const handleUpdate = async (e) => {
    e.preventDefault();

    const success = await updateProfile({
      name,      // 🔹 Champ unique pour le backend
      email,
      password,
      image,
    });

    if (success) {
      alert("Profil mis à jour ✅");
      setPassword(""); // nettoyer le champ mot de passe
    } else {
      alert("Erreur lors de la mise à jour ❌");
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-700">Chargement...</p>;
  if (!user)
    return (
      <p className="text-center mt-20 text-gray-700">
        Connectez-vous pour voir votre profil.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-[#b48456]">
      <h2 className="text-3xl font-bold text-center text-[#b48456] mb-6">
        Mon Profil
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Image */}
        <div className="flex flex-col items-center">
          <img
            src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profil"
            className="h-24 w-24 rounded-full object-cover border-2 border-[#b48456] mb-3"
          />
          <input
            type="text"
            placeholder="URL de l'image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
          />
        </div>

        {/* Nom complet */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nouveau mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Laissez vide pour ne pas changer"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-5 py-3 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full text-lg transition-all duration-300 hover:bg-[#b48456] hover:text-white"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
