const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productController");

// Routes publiques
router.get("/", getAllProducts);
router.get("/by-category", getProductsByCategory);
router.get("/:id", getOneProduct);

// Routes protégées (à protéger avec middleware admin)
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
