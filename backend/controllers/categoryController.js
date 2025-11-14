const Category = require("../models/category");

const cloudinary = require("cloudinary").v2;
const fs = require("fs");

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

    let imageUrls = [];
    let publicIds = [];

    // ✅ Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "categories",
        });

        imageUrls.push(result.secure_url);
        publicIds.push(result.public_id);

        // 🧹 supprimer fichier local
        fs.unlinkSync(file.path);
      }
    }

    const category = new Category({
      name,
      description,
      images: imageUrls,       // ✅ URLs Cloudinary
      imagePublicId: publicIds // ✅ Public IDs Cloudinary
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
