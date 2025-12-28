const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    chemist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        quantity: Number,
        rate: Number,
      },
    ],

    subTotal: Number,
    gstAmount: Number,
    grandTotal: Number,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Dispatched"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
