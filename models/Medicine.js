const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    rate: { type: Number, required: true },
    price: { type: Number, required: true },
    scheme: String,
    inputs: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
