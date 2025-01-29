const mongoose = require("mongoose");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Add Product to Cart
exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // ✅ Validate if productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ status: "error", message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ products: [] });

    cart.products.push({ product: productId, quantity: 1 });
    await cart.save();

    res.status(200).json({ status: "success", data: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Get Cart Items
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("products.product");
    if (!cart) return res.status(200).json({ status: "success", data: { products: [] } });

    res.status(200).json({ status: "success", data: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Calculate Total Price
exports.getTotalPrice = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("products.product");
    if (!cart) return res.status(200).json({ total: 0 });

    const discounts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    const bookPrice = 100;
    let totalPrice = 0;
    let books = [];

    // Flatten the cart to account for book quantities
    cart.products.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        books.push(item.product._id); // Store each book instance separately
      }
    });

    // Apply discounts in sets of unique books
    while (books.length > 0) {
      let uniqueBooks = [...new Set(books)]; // Get unique book IDs
      let discount = discounts[uniqueBooks.length - 1] || 0; // Find discount based on set size
      let priceForSet = uniqueBooks.length * bookPrice * (1 - discount);
      totalPrice += priceForSet;

      // Remove one occurrence of each unique book from books array
      uniqueBooks.forEach((bookId) => {
        let index = books.indexOf(bookId);
        if (index > -1) books.splice(index, 1);
      });
    }

    res.status(200).json({ total: totalPrice });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
