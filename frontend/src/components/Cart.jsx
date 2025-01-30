import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cartBooks, setCartBooks] = useState([]); // Store cart items
  const [total, setTotal] = useState(0); // Total price
  const [totalDiscount, setTotalDiscount] = useState(0); // Total discount
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = "http://127.0.0.1:3000/api/v1";

  // Fetch cart items from API & merge with local storage data
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Fetch all products from API
        const response = await axios.get(`${API_URL}/products`);
        const allProducts = response.data.data;

        // Merge API data with local storage quantity
        const cartProducts = storedCart
          .map((cartItem) => {
            const fullBook = allProducts.find(
              (book) => book._id === cartItem._id
            );
            return fullBook
              ? { ...fullBook, quantity: cartItem.quantity }
              : null;
          })
          .filter(Boolean);

        setCartBooks(cartProducts);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // 📌 Calculate total using API
  const calculateTotal = async () => {
    try {
      setLoading(true);

      // ✅ Send cart items to backend for calculation
      const response = await axios.post(`${API_URL}/cart/total`, {
        products: cartBooks.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      });

      setTotal(response.data.total);
      setTotalDiscount(response.data.totalDiscount); // ✅ Store discount in state
      setLoading(false);
    } catch (error) {
      console.error("Error calculating total:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>

      {/* Display books with quantity */}
      {cartBooks.length > 0 ? (
        <ul className="list-disc pl-6 mt-2">
          {cartBooks.map((book, index) => (
            <li key={index} className="mb-1">
              {book.name} - {book.price || 100} THB x {book.quantity} ={" "}
              {(book.price || 100) * book.quantity} THB
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* 📌 Calculate Total Price Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={calculateTotal}
        disabled={cartBooks.length === 0 || loading}
      >
        {loading ? "Calculating..." : "Calculate Total"}
      </button>

      {total > 0 && (
        <div className="mt-4 text-lg">
          <p>
            <span className="font-bold">Total Price:</span> {total} THB
          </p>
          <p className="text-green-600">
            <span className="font-bold">Total Discount:</span> {totalDiscount}{" "}
            THB
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
