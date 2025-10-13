
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // image par défaut
    },
    role: {
      type: [String],
      enum: ["admin", "client"],
      default: "client",
    },
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

// Méthode pour générer le token JWT
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

// Validation pour l'inscription
const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label(" name"),
    email:     Joi.string().email().required().label("Email"),
    password:  Joi.string().min(6).required().label("Password"),
    role:      Joi.string().valid("admin", "client").label("Role"),
  });
  return schema.validate(data);
};

// Validation pour le login
const validateLogin = (data) => {
  const schema = Joi.object({
    email:    Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    
  });
  return schema.validate(data);
};


module.exports = { User, validateRegister, validateLogin };
