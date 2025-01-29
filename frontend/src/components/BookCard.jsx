function BookCard({ book }) {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the book already exists in the cart
    const existingBookIndex = cart.findIndex((item) => item._id === book._id);

    if (existingBookIndex !== -1) {
      // Increase quantity if book is already in the cart
      cart[existingBookIndex].quantity += 1;
    } else {
      // Add new book with quantity 1
      cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.name} has been added to your cart!`);
  };

  return (
    <div className="border rounded shadow-md p-4 hover:shadow-lg">
      <img src={book.image} alt={book.name} className="h-40 w-full object-cover mb-4" />
      <h3 className="font-bold text-lg">{book.name}</h3>
      <p className="text--color">{book.price} THB</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default BookCard;

