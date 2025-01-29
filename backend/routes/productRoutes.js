const express = require("express");
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../controller/productController");

const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts); // Create & Get All Products
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct); // Get, Update, Delete by ID

module.exports = router;
