const Product = require("../models/product");

// ✅ Créer un produit
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      images,
      stock,
      category,
      subCategory,
      material,
      color,
      featured,
    } = req.body;

    // Validation manuelle minimale
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        message:
          "Les champs nom, description, prix, catégorie et sous-catégorie sont obligatoires.",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      images,
      stock,
      category,
      subCategory,
      material,
      color,
      featured,

    });

    await product.save();
    res.status(201).json({ message: "✅ Produit créé avec succès", product });
  } catch (error) {
    console.error("❌ Erreur création produit:", error);
    res.status(500).json({ message: "Erreur lors de la création du produit" });
  }
};

// ✅ Récupérer tous les produits
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Erreur récupération produits:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};

// ✅ Récupérer un produit par ID
const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Erreur récupération produit:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Mettre à jour un produit
const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: Date.now() };
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.status(200).json({
      message: "✅ Produit mis à jour avec succès",
      updatedProduct,
    });
  } catch (error) {
    console.error("❌ Erreur mise à jour produit:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
};

// ✅ Supprimer un produit
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.status(200).json({ message: "✅ Produit supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression produit:", error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// ✅ Récupérer les produits par catégorie ou sous-catégorie
const getProductsByCategory = async (req, res) => {
  try {
    const { category, subCategory } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    const products = await Product.find(filter).sort({ createdAt: -1 });

    if (!products.length)
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette catégorie." });

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Erreur récupération par catégorie:", error);
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// ✅ Export
module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
