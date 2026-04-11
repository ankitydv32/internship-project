const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateStatus
} = require("../controllers/adminController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.get("/orders", verifyToken, isAdmin, getAllOrders);
router.put("/orders/:id", verifyToken, isAdmin, updateStatus);

module.exports = router;