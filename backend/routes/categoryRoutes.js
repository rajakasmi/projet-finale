const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { auth } = require("../middlewares/authRole");
const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const upload = require("../middlewares/multer");

// 📦 Routes Catégories
router.get("/", getAllCategories);


router.post("/", upload.array("images", 5), validateToken, auth , createCategory);
router.delete("/:id",validateToken , auth , deleteCategory); // ✅ ajout suppression

module.exports = router;
