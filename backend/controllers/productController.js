const fs = require("fs");
const path = require("path");
const Product = require("../models/product");

// 📁 Dossier d’upload
const UPLOADS_DIR = "uploads/";

/* -------------------------------------------------------------------------- */
/* 🟢 CRÉER UN PRODUIT                                                        */

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      material,
      color,
      featured,
      onSale,
      salePrice,
      saleStartDate,
      saleEndDate,
    } = req.body;

    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({ message: "Champs obligatoires manquants." });
    }

    // 🔥 Gestion multiple images
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      subCategory,
      material,
      color,
      featured,
      onSale,
      salePrice,
      saleStartDate,
      saleEndDate,
      images, // tableau
    });

    await product.save();
    res.status(201).json({ message: "✅ Produit créé avec succès", product });
  } catch (error) {
    console.error("❌ Erreur création produit:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
/* -------------------------------------------------------------------------- */
/* 🟡 RÉCUPÉRER TOUS LES PRODUITS                                             */
/* -------------------------------------------------------------------------- */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Erreur récupération produits:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟠 RÉCUPÉRER UN PRODUIT PAR ID                                             */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/* 🟣 METTRE À JOUR UN PRODUIT                                                */
/* -------------------------------------------------------------------------- */
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = { ...req.body, updatedAt: Date.now() };

    // ✅ Si nouvelles images uploadées
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => `/${UPLOADS_DIR}${file.filename}`);
      updateData.images = newImages;

      // 🔥 Supprimer les anciennes images
      const oldProduct = await Product.findById(productId);
      if (oldProduct && oldProduct.images && oldProduct.images.length > 0) {
        oldProduct.images.forEach((imgPath) => {
          const fullPath = path.join(__dirname, "..", imgPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    res.status(200).json({
      message: "✅ Produit mis à jour avec succès",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Erreur update produit:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit" });
  }
};


/* -------------------------------------------------------------------------- */
/* 🔴 SUPPRIMER UN PRODUIT                                                    */
/* -------------------------------------------------------------------------- */
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Produit non trouvé" });

    // 🧹 Supprimer le fichier image correspondant
    if (deletedProduct.image) {
      const filePath = path.join(__dirname, "..", deletedProduct.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "✅ Produit supprimé avec succès" });
  } catch (error) {
    console.error("❌ Erreur suppression produit:", error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

/* -------------------------------------------------------------------------- */
/* 🟤 FILTRER PAR CATÉGORIE / SOUS-CATÉGORIE                                 */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/* 🟢 PRODUITS EN SOLDE                                                      */
/* -------------------------------------------------------------------------- */
const getOnSaleProducts = async (req, res) => {
  try {
    const today = new Date();
    const products = await Product.find({
      onSale: true,
      saleStartDate: { $lte: today },
      saleEndDate: { $gte: today },
    }).sort({ createdAt: -1 });

    if (!products.length)
      return res.status(404).json({ message: "Aucun produit en solde actuellement." });

    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Erreur récupération produits en solde:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits en solde" });
  }
};

/* -------------------------------------------------------------------------- */
/* 📤 EXPORT                                                                 */
/* -------------------------------------------------------------------------- */
module.exports = {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getOnSaleProducts,
};
