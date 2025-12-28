const express = require("express");
const Medicine = require("../models/Medicine");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const meds = await Medicine.find();
  res.json(meds);
});

router.post("/", auth, admin, async (req, res) => {
  const med = await Medicine.create(req.body);
  res.json(med);
});

router.put("/:id", auth, admin, async (req, res) => {
  const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(med);
});

router.delete("/:id", auth, admin, async (req, res) => {
  await Medicine.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
