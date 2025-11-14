const { User, validateRegister, validateLogin } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

// Enregistrement
const register = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).json({ message: "User with given email already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({ ...req.body, password: hashPassword });
    await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({ message: "Registration successful", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid email or password." });

    const token = user.generateAuthToken();

    res.status(200).json({ token, user, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Récupérer le profil
const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Mettre à jour le profil avec Cloudinary
const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // ✅ Si une image est envoyée via Cloudinary (multer-storage-cloudinary)
    if (req.file) {
      // Supprimer ancienne image si elle existe
      const currentUser = await User.findById(req.user._id);
      if (currentUser?.image) {
        const publicId = currentUser.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy("products/" + publicId);
      }

      // Enregistrer la nouvelle image Cloudinary
      updateData.image = req.file.path; // URL Cloudinary
    }

    if (password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user: updatedUser,
      message: "Profile updated successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, getProfile, getAllUsers, updateProfile };
