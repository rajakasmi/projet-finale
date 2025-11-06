const { User, validateRegister, validateLogin } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// Middleware d’authentification JWT


// Récupérer le profil
const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// backend/controllers/userController.js
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure le mot de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};



// Mettre à jour le profil
const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // ✅ Si image uploadée via multer
    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
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


module.exports = { register, login, getProfile,getAllUsers, updateProfile };
