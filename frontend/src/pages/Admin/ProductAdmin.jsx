import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axiosInstance from "../../api/axiosInstance";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext"; 

const API_URL = "/products";

export default function ProductAdmin() {
  const { user } = useAuth(); // ✅ récupère le token JWT
  const { products, loading, error, fetchProducts } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subCategory: "",
    material: "",
    color: "",
    featured: false,
    onSale: false,
    salePrice: "",
    saleStartDate: "",
    saleEndDate: "",
    images: [],
  });

  // ✅ Ouvrir modale (édition ou ajout)
  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        saleStartDate: product.saleStartDate
          ? product.saleStartDate.split("T")[0]
          : "",
        saleEndDate: product.saleEndDate ? product.saleEndDate.split("T")[0] : "",
        images: [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        subCategory: "",
        material: "",
        color: "",
        featured: false,
        onSale: false,
        salePrice: "",
        saleStartDate: "",
        saleEndDate: "",
        images: [],
      });
    }
    setModalOpen(true);
  };

  // ✅ Gérer les changements de champs
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };
  
  

  // ✅ Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous supprimer ce produit ?")) return;
    try {
      const token = user?.token || localStorage.getItem("token");
      await axiosInstance.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert("Erreur lors de la suppression du produit");
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  Object.keys(formData).forEach((key) => {
    if (key === "images") {
      [...formData.images].forEach((file) => data.append("images", file));
    } else {
      data.append(key, formData[key] ?? "");
    }
  });

  try {
    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      alert("Non autorisé — veuillez vous reconnecter.");
      return;
    }

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    if (editingProduct) {
      await axiosInstance.put(`${API_URL}/${editingProduct._id}`, data, {
        headers,
      });
      alert("Produit mis à jour avec succès ✅");
    } else {
      await axiosInstance.post(API_URL, data, {
        headers,
      });
      alert("Produit ajouté avec succès ✅");
    }

    setModalOpen(false);
    fetchProducts();
  } catch (error) {
    console.error("Erreur ajout/modification:", error);
    alert("Erreur lors de l’enregistrement du produit");
  }
};


   // ✅ Rendu principal
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Gestion des Produits
        </h1>
        <button
          onClick={() => openModal()}
          className="flex items-center bg-[#b48456] text-white px-4 py-2 rounded-lg hover:bg-[#9b744b] transition"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un produit
        </button>
      </div>

      {/* TABLE PRODUITS */}
      {loading ? (
        <p className="text-gray-500 text-center">Chargement...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Catégorie</th>
                <th className="py-3 px-4 text-left">Prix</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <img
                      src={
                        p.images?.[0]
                          ? p.images[0]
                          : "https://via.placeholder.com/60"
                      }
                      alt={p.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.category || "-"}</td>
                  <td className="py-3 px-4">{p.price} DT</td>
                  <td className="py-3 px-4">{p.stock}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openModal(p)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODALE AJOUT / MODIF */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NOM */}
              <div>
                <label className="block text-gray-700">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                ></textarea>
              </div>

              {/* PRIX & STOCK */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Prix (DT)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              {/* CATÉGORIE */}
              <div>
                <label className="block text-gray-700">Catégorie</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">-- Sélectionner --</option>
                  <option value="Luminaires">Luminaires</option>
                  <option value="Décoration murale">Décoration murale</option>
                  <option value="Objets déco">Objets déco</option>
                </select>
              </div>

              {/* AUTRES CHAMPS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Sous-catégorie</label>
                  <input
                    type="text"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Matériau</label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* COULEUR + OPTIONS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Couleur</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex items-center space-x-3 mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Produit vedette
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="onSale"
                      checked={formData.onSale}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    En solde
                  </label>
                </div>
              </div>

              {/* PROMO */}
              {formData.onSale && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700">Prix promo</label>
                    <input
                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Début promo</label>
                    <input
                      type="date"
                      name="saleStartDate"
                      value={formData.saleStartDate}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Fin promo</label>
                    <input
                      type="date"
                      name="saleEndDate"
                      value={formData.saleEndDate}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
              )}

              {/* IMAGES */}
              <div>
                <label className="block text-gray-700">Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* BOUTON */}
              <button
                type="submit"
                className="w-full bg-[#b48456] text-white py-2 rounded-lg hover:bg-[#9b744b] transition"
              >
                {editingProduct ? "Mettre à jour" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}