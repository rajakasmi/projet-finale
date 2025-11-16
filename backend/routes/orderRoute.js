const express = require("express");
const router = express.Router();
const { createOrder, getOneOrder, getAllOrders, updateOrder, getMyOrders , updateOrderStatus} = require("../controllers/orderController");
const validateToken = require("../middlewares/validateToken");
const { auth } = require("../middlewares/authRole");

router.get("/",validateToken,auth , getAllOrders);
router.put("/:id/status",validateToken, auth , updateOrderStatus);
router.put("/:id",validateToken, auth , updateOrder);

router.post("/",validateToken,  createOrder);
router.get("/:id",validateToken, getOneOrder);
router.get("/",validateToken, getMyOrders);





module.exports = router;
