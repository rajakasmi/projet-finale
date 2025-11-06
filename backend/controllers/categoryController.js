const Category = require("../models/category");

const UPLOADS_DIR = "uploads/"; // ✅ Correction : définir le dossier des images

// ✅ Récupérer toutes les catégories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Créer une catégorie
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom est obligatoire." });
    }

    // ✅ Gérer les images uploadées
    const imagePaths = req.files
      ? req.files.map((file) => `/${UPLOADS_DIR}${file.filename}`)
      : [];

    const category = new Category({
      name,
      description,
      images: imagePaths,
    });

    await category.save();

    res.status(201).json({
      message: "✅ Catégorie créée avec succès",
      category,
    });
  } catch (error) {
    console.error("❌ Erreur création catégorie:", error);
    res.status(500).json({ message: "Erreur lors de la création", error });
  }
};

// ✅ Supprimer une catégorie
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ message: "Catégorie introuvable" });

    res.status(200).json({ message: "✅ Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
