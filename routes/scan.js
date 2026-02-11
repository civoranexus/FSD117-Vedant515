const router = require("express").Router();
const Product = require("../models/product");
const ScanLog = require("../models/scanlog");

router.get("/:qrToken", async (req, res) => {
  const product = await Product.findOne({ qrToken: req.params.qrToken });

  if (!product) {
    await ScanLog.create({
      qrToken: req.params.qrToken,
      type: "fake"
    });

    return res.json({ valid: false, message: "Fake QR Code" });
  }

  product.scans += 1;
  await product.save();

  await ScanLog.create({
    qrToken: product.qrToken,
    product: product._id,
    vendor: product.vendor,
    type: "valid"
  });

  res.json({
    valid: true,
    product
  });
});

module.exports = router;
