import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);

  // 📌 Fetch products from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/v1/products");
        setBooks(response.data.data); // Assuming the response structure is { status: "success", data: [...] }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    setCartBooks([...cartBooks, book]);
    alert(`${book.name} has been added to your cart!`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text--color mb-4">
        Welcome to the Promotion Calculator
      </h2>
      <p className="text--color mb-8">
        Explore our collection of books and add them to your cart to calculate the total price with discounts.
      </p>

      {/* 📌 Display all books from API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    </div>
  );
}

export default Home;

