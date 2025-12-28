const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    role: {
      type: String,
      enum: ["admin", "chemist"],
      default: "chemist",
    },

    shopName: String,
    phone: String,

    isApproved: {
      type: Boolean,
      default: true, // 🔥 allow chemist login
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
