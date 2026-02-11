const mongoose = require("mongoose");

const scanLogSchema = new mongoose.Schema({
  qrToken: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["valid", "fake", "already-used"] },
  ipAddress: String
}, { timestamps: true });

module.exports = mongoose.model("ScanLog", scanLogSchema);
