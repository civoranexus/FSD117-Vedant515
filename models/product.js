const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  imageUrl: String,
  qrToken: String,
  qrImage: String,
  scans: { type: Number, default: 0 },
  status: { type: String, default: "active" },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
