const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const Product = require("../models/product");
const ScanLog = require("../models/scanlog");

router.get("/dashboard", auth(["admin"]), async (req, res) => {
  const vendors = await User.countDocuments({ role: "vendor" });
  const products = await Product.countDocuments();
  const scans = await ScanLog.countDocuments();

  res.json({ vendors, products, scans });
});

router.get("/vendors", auth(["admin"]), async (req, res) => {
  const vendors = await User.find({ role: "vendor" });
  res.json(vendors);
});

router.get("/products", auth(["admin"]), async (req, res) => {
  const products = await Product.find().populate("vendor");
  res.json(products);
});

router.get("/audit", auth(["admin"]), async (req, res) => {
  const logs = await ScanLog.find()
    .populate("product")
    .populate("vendor");
  res.json(logs);
});

module.exports = router;
