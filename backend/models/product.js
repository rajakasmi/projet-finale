const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est obligatoire"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est obligatoire"],
    },
    price: {
      type: Number,
      required: [true, "Le prix est obligatoire"],
      min: 0,
    },
    images: [
      {
        type: String, // URL ou chemin de l’image
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Luminaires", "Décoration murale", "Objets déco"],
    },
    subCategory: {
      type: String,
      required: true,
      enum: [
        "Lampes",
        "Suspensions",
        "Lampadaires",
        "Tableaux décoratifs",
        "Miroirs muraux",
        "Cadres élégants",
        "Vases design",
        "Statues d’intérieur",
        "Bougies parfumées",
      ],
    },
    material: {
      type: String,
      default: "Non spécifié",
    },
    color: {
      type: String,
      default: "Non spécifié",
    },
    featured: {
      type: Boolean,
      default: false,
    },

    // 🟢 Nouveau champ : produit en solde
    onSale: {
      type: Boolean,
      default: false, // false = pas en solde
    },
    salePrice: {
      type: Number,
      min: 0,
      
    },
    saleStartDate: {
      type: Date,
    },
    saleEndDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
