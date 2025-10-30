
const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const { register, login, getProfile, updateProfile } = require("../controllers/userController");

    // Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile",validateToken, getProfile );
router.put("/profile",validateToken,updateProfile );

module.exports = router;