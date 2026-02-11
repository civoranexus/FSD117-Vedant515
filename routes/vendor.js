const router = require("express").Router();
const auth = require("../middleware/auth");
const Product = require("../models/product");
const QRCode = require("qrcode");
const ScanLog = require("../models/scanlog");

// Get Vendor Recent Scans
router.get("/scans", auth(["vendor"]), async (req, res) => {

  const logs = await ScanLog.find({
    vendor: req.user.id
  })
  .populate("product")
  .sort({ createdAt: -1 })
  .limit(5);

  res.json(logs);
});

// Create Product
router.post("/products", auth(["vendor"]), async (req, res) => {
  const qrToken = "QR-" + Math.random().toString(36).substr(2, 10).toUpperCase();
  const qrImage = await QRCode.toDataURL(qrToken);

  const product = await Product.create({
    ...req.body,
    qrToken,
    qrImage,
    vendor: req.user.id
  });

  res.json(product);
});

// Get Vendor Products
router.get("/products", auth(["vendor"]), async (req, res) => {
  const products = await Product.find({ vendor: req.user.id });
  res.json(products);
});

// Delete Product
router.delete("/products/:id", auth(["vendor"]), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
