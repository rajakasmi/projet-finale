const Order = require("../models/order");

// ✅ Créer une nouvelle commande
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Commande créée avec succès ✅",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res.status(500).json({ message: "Erreur interne lors de la création de la commande" });
  }
};

// ✅ Récupérer une seule commande par ID
const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email") // facultatif : pour afficher les infos utilisateur
      .populate("products.productId", "title price"); // facultatif : afficher les détails produits

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée ❌" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// ✅ Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "title price");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  createOrder,
  getOneOrder,
  getAllOrders,
};
