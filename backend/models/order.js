const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      fullName: {
        type: String,
        required: [true, "Le nom complet est obligatoire"],
      },
      address: {
        type: String,
        required: [true, "L'adresse est obligatoire"],
      },
      telephone: {
        type: String,
        required: [true, "Le numéro de téléphone est obligatoire"],
      },
      country: {
        type: String,
        required: [true, "Le pays est obligatoire"],
      },
      city: {
        type: String,
        required: [true, "La ville est obligatoire"],
      },
      postalCode: {
        type: String,
        required: [true, "Le code postal est obligatoire"],
      },
    },

    // ✅ Méthode de paiement
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "paypal"],
      default: "cash",
    },

    status: {
      type: String,
      enum: ["en attente", "en cours", "livrée", "annulée"],
      default: "en attente",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
