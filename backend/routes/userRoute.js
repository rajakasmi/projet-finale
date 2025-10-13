
const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const { register, login, getProfile, updateProfile } = require("../controllers/userController");

    // Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile ,validateToken);
router.put("/profile/:id", updateProfile ,validateToken);

module.exports = router;