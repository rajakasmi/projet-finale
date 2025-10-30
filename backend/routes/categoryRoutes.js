const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory } = require("../controllers/categoryController.js");
const upload = require("../middlewares/multer");

router.get("/",  getAllCategories);
router.post("/",upload.array("images", 5), createCategory);

module.exports = router;
