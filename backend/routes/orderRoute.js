const express = require("express");
const router = express.Router();
const { createOrder, getOneOrder, getAllOrders, updateOrder, getMyOrders } = require("../controllers/orderController");
const validateToken = require("../middlewares/validateToken");

router.post("/",validateToken, createOrder);
router.get("/:id",validateToken, getOneOrder);
router.get("/",validateToken, getAllOrders);
router.put("/:id",validateToken, updateOrder);
router.get("/",validateToken, getMyOrders);


module.exports = router;
