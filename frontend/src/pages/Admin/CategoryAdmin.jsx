import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";

const API_URL = "/categories";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  // ✅ Charger les catégories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(API_URL);
      setCategories(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fichiers uploadés
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // ✅ Ajouter une catégorie
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      images.forEach((img) => formData.append("images", img));
            const token = user?.token || localStorage.getItem("token");

      await axiosInstance.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" , Authorization: `Bearer ${token}` },
      });

      setName("");
      setDescription("");
      setImages([]);
      fetchCategories();
      setMessage("✅ Catégorie ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      setMessage("❌ Erreur lors de la création de la catégorie.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Supprimer une catégorie
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      await axiosInstance.delete(`${API_URL}/${id}`);
      fetchCategories();
      setMessage("🗑️ Catégorie supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestion des Catégories</h1>

      {/* Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Ajouter une catégorie</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nom"
            className="border rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border rounded-lg p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5" />
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </form>

      {/* Liste */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Liste des catégories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">Aucune catégorie trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {cat.images?.length > 0 && (
                  <img
                    src={cat.images[0]}
                    alt={cat.name}
                    className="h-40 w-full object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  {cat.description || "Aucune description"}
                </p>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-5 w-5" />
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryAdmin;
