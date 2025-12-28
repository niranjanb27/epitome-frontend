const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const order = await Order.create({
    chemistId: req.user.id,
    items: req.body.items,
    totalAmount: req.body.totalAmount
  });
  res.status(201).json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ chemistId: req.user.id })
    .populate("items.medicineId");
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("chemistId")
    .populate("items.medicineId");
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};
