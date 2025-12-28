const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =======================
   CREATE ORDER (CHEMIST)
======================= */
router.post("/", auth, async (req, res) => {
  try {
    const { items } = req.body;

    const subTotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
    const gstAmount = (subTotal * 12) / 100;
    const grandTotal = subTotal + gstAmount;

    const order = await Order.create({
      chemist: req.user.id,
      items,
      subTotal,
      gstAmount,
      grandTotal,
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed" });
  }
});

/* =======================
   GET CHEMIST ORDERS (LATEST FIRST)
======================= */
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ chemist: req.user.id })
      .sort({ createdAt: -1 }) // 🔹 latest first
      .populate("items.medicine");

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
});

/* =======================
   GET ALL ORDERS (ADMIN)
======================= */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // 🔹 latest first for admin
      .populate("items.medicine")
      .populate("chemist", "shopName");

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =======================
   UPDATE ORDER STATUS
======================= */
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
});

module.exports = router;
