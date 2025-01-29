const express = require("express");
const { addToCart, getCart, getTotalPrice } = require("../controller/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.get("/total", getTotalPrice);

module.exports = router;