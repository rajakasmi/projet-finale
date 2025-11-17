const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");
const { auth } = require("../middlewares/authRole");
const upload = require("../middlewares/multer");

const { register, login, getProfile, getAllUsers, updateProfile } = require("../controllers/userController");

    // Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile",validateToken, getProfile );
router.get("/",validateToken, auth , getAllUsers );
router.put("/profile",validateToken,upload.single("image"),updateProfile );

module.exports = router;