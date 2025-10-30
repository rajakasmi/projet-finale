const Order = require("../models/order");


// ✅ Créer une nouvelle commande
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Validation minimale
    if (!userId || !products || !shippingAddress) {
      return res
        .status(400)
        .json({ message: "Certains champs obligatoires sont manquants ❌" });
    }

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || "cash", // par défaut "cash"
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Commande créée avec succès ✅",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res
      .status(500)
      .json({ message: "Erreur interne lors de la création de la commande" });
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.productId", "name price images")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }   
};

// ✅ Récupérer une commande par ID
const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("products.productId", "name price images");

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
      .populate("products.productId", "name price images")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// ✅ Mettre à jour une commande (ex: statut, adresse, paiement, etc.)
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("userId", "name email")
      .populate("products.productId", "name price");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Commande non trouvée ❌" });
    }

    res.status(200).json({
      message: "Commande mise à jour avec succès ✅",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande:", error);
    res
      .status(500)
      .json({ message: "Erreur interne lors de la mise à jour de la commande" });
  }
};

module.exports = {
  createOrder,
  getOneOrder,
  getAllOrders,
  updateOrder,
  getMyOrders,
};
