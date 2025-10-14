const express = require("express");
const router = express.Router();
const { createOrder, getOneOrder, getAllOrders } = require("../controllers/orderController");

// POST - Créer une commande
router.post("/", createOrder);

// GET - Récupérer une commande par ID
router.get("/:id", getOneOrder);

// GET - Récupérer toutes les commandes
router.get("/", getAllOrders);

module.exports = router;
