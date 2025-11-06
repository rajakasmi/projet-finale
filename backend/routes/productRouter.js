const express = require("express");
const {auth} = require("../middlewares/authRole");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();
const upload = require("../middlewares/multer");
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getOnSaleProducts
} = require("../controllers/productController");

// Routes publiques
router.get("/", getAllProducts);
router.get("/:category", getProductsByCategory);
router.get("/:id", getOneProduct);
router.get("/sales/on-sale",  getOnSaleProducts);

// Routes protégées (à protéger avec middleware admin)
router.post("/", validateToken ,auth ,  upload.array("images", 5), createProduct ,);
router.put("/:id",validateToken, auth ,upload.array("images", 5), updateProduct );
router.delete("/:id", validateToken,auth ,deleteProduct );


module.exports = router;
