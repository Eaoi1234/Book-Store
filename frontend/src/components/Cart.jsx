import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart() {
  const [cartBooks, setCartBooks] = useState([]); // Store cart items
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0); // Store total discount

  // Fetch cart items from API or local storage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const response = await axios.get("http://127.0.0.1:3000/api/v1/products");

        // Merge API data with cart quantity
        const cartProducts = storedCart
          .map((cartItem) => {
            const fullBook = response.data.data.find((book) => book._id === cartItem._id);
            return fullBook ? { ...fullBook, quantity: cartItem.quantity } : null;
          })
          .filter(Boolean);

        setCartBooks(cartProducts);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price with discount
  const calculateTotal = () => {
    const discounts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    let totalPrice = 0;
    let totalBooks = cartBooks.reduce((sum, book) => sum + book.quantity, 0);
    let books = [];

    // Convert books into a flat list where each book appears "quantity" times
    cartBooks.forEach((book) => {
      for (let i = 0; i < book.quantity; i++) {
        books.push(book._id); // Store each book ID separately
      }
    });

    // Process book sets while there are still books left in the array
    while (books.length > 0) {
      let uniqueBooks = [...new Set(books)]; // Get unique book IDs in this set
      let discount = discounts[uniqueBooks.length - 1] || 0; // Apply discount based on unique books
      let priceForSet = uniqueBooks.length * 100 * (1 - discount); // Calculate price for this set
      totalPrice += priceForSet;

      // Remove one occurrence of each unique book from books array
      uniqueBooks.forEach((bookId) => {
        let index = books.indexOf(bookId);
        if (index > -1) books.splice(index, 1);
      });
    }

    let totalDiscount = totalBooks * 100 - totalPrice;
    setTotal(totalPrice);
    setTotalDiscount(totalDiscount); // Store total discount in state
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>

      {/* 📌 Display books with quantity */}
      {cartBooks.length > 0 ? (
        <ul className="list-disc pl-6 mt-2">
          {cartBooks.map((book, index) => (
            <li key={index} className="mb-1">
              {book.name} - {book.price} THB x {book.quantity} ={" "}
              {book.price * book.quantity} THB
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* 📌 Calculate Total Price */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={calculateTotal}
        disabled={cartBooks.length === 0}
      >
        Calculate Total
      </button>

      {total > 0 && (
        <div className="mt-4 text-lg">
          <p>
            <span className="font-bold">Total Price:</span> {total} THB
          </p>
          <p className="text-green-600">
            <span className="font-bold">Total Discount:</span> {totalDiscount} THB
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
