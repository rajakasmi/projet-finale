const fs = require("fs");
const path = require("path");
const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;

// 📁 Dossier d’upload


/* -------------------------------------------------------------------------- */
/* 🟢 CRÉER UN PRODUIT                                                        */

const createProduct = async (req, res) => {
  try {
    const files = req.files;
    let imageUrls = [];
    let publicIds = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        imageUrls.push(result.secure_url);
        publicIds.push(result.public_id);

        fs.unlinkSync(file.path); // Supprime le fichier local après upload
      }
    }

    const product = new Product({
      ...req.body,
      images: imageUrls,         // ✅ tableau d’URLs
      imagePublicId: publicIds,  // ✅ tableau des public_id
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
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

    if (req.files && req.files.length > 0) {
      const oldProduct = await Product.findById(productId);

      // 🧹 Supprimer anciennes images Cloudinary si elles existent
      if (oldProduct?.imagePublicId?.length) {
        for (const publicId of oldProduct.imagePublicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // 📤 Upload nouvelles images
      let imageUrls = [];
      let publicIds = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });

        imageUrls.push(result.secure_url);
        publicIds.push(result.public_id);

        // 🧹 supprimer fichier local
        fs.unlinkSync(file.path);
      }

      updateData.images = imageUrls;
      updateData.imagePublicId = publicIds;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({
      message: "✅ Produit mis à jour avec succès",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Erreur update product:", error);
    res.status(500).json({ message: "Erreur serveur", error });
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
