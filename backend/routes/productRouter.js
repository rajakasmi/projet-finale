const express = require("express");
const auth = require("../middlewares/authRole");
const validateToken = require("../middlewares/validateToken");
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
router.get("/:category", getProductsByCategory);
router.get("/:id", getOneProduct);

// Routes protégées (à protéger avec middleware admin)
router.post("/", createProduct , auth(["admin"]), validateToken);
router.put("/:id", updateProduct , auth , validateToken );
router.delete("/:id", deleteProduct ,  auth ,validateToken);

module.exports = router;
