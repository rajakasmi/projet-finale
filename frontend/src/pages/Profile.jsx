import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, getProfile, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(""); // pour l’aperçu
  const [file, setFile] = useState(null); // pour envoyer au serveur
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
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImage(URL.createObjectURL(selected)); // preview image
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (file) formData.append("image", file); // ✅ envoyer le fichier

    const success = await updateProfile(formData, true); // true = multipart

    if (success) {
      alert("Profil mis à jour ✅");
      setPassword("");
    } else {
      alert("Erreur lors de la mise à jour ❌");
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-700">Chargement...</p>;
  if (!user)
    return <p className="text-center mt-20 text-gray-700">Connectez-vous pour voir votre profil.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-24 p-8 bg-white rounded-2xl shadow-xl border border-[#b48456]">
      <h2 className="text-3xl font-bold text-center text-[#b48456] mb-6">
        Mon Profil
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col items-center">
          <img
            src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profil"
            className="h-24 w-24 rounded-full object-cover border-2 border-[#b48456] mb-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Nom complet */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-5 py-3 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full text-lg hover:bg-[#b48456] hover:text-white transition"
        >
          Mettre à jour
        </button>

      </form>
    </div>
  );
}
