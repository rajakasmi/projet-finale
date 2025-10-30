const express = require("express");
const Category = require("../models/category");


// ✅ Récupérer toutes les catégories
 const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Créer une nouvelle catégorie (optionnel pour tests)
 const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Le nom est obligatoire." });
    }

    // ✅ Si une image a été uploadée
    const imagePath = req.file ? `/${UPLOADS_DIR}${req.file.filename}` : null;

    const category = new Category({
      name,
      description,
      images: imagePath ? [imagePath] : [],
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
module.exports = {  
    getAllCategories,
    createCategory
};  