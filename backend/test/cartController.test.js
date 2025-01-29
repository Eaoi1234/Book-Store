const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Import your Express app
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ✅ Setup a test database using MongoDB Memory Server
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// 📌 Before running tests, start an in-memory MongoDB server
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// 📌 After each test, clear the database
afterEach(async () => {
  await Cart.deleteMany();
  await Product.deleteMany();
});

// 📌 After all tests, close the MongoDB connection
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Cart Controller Tests", () => {
  let testProduct;

  // 📌 Create a test product before running tests
  beforeEach(async () => {
    testProduct = await Product.create({
      name: "Book1",
      price: 100,
      image: "abc",
    });
  });

  // ✅ TEST: Add a product to cart
  test("Should add product to cart", async () => {
    const res = await request(app).post("/api/v1/cart/add").send({
      productId: testProduct._id.toString(),
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.products.length).toBe(1);
    expect(res.body.data.products[0].product).toBe(testProduct._id.toString());
  });

  // ✅ TEST: Retrieve cart items (should contain 1 item after adding)
  test("Should get cart items", async () => {
    await Cart.create({
      products: [{ product: testProduct._id, quantity: 1 }],
    });

    const res = await request(app).get("/api/v1/cart");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.products.length).toBe(1);
    expect(res.body.data.products[0].product._id).toBe(testProduct._id.toString());
  });

  // ✅ TEST: Get total price (should calculate correctly)
  test("Should calculate total price", async () => {
    await Cart.create({
      products: [{ product: testProduct._id, quantity: 2 }],
    });

    const res = await request(app).get("/api/v1/cart/total");

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(200); // 2 books × $100 each
  });

  // ❌ TEST: Add to cart with an invalid product ID
  test("Should return error for invalid product ID", async () => {
    const res = await request(app).post("/api/v1/cart/add").send({
      productId: "invalid-id",
    });
  
    expect(res.status).toBe(400); // ✅ Should return 400 Bad Request
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Invalid product ID");
  });

  // ❌ TEST: Add to cart with a non-existing product
  test("Should return error for invalid product ID", async () => {
    const res = await request(app).post("/api/v1/cart/add").send({
      productId: "invalid-id", // Not a valid MongoDB ObjectId
    });
  
    console.log("Test Response:", res.body); // ✅ Debugging output
  
    expect(res.status).toBe(400); // ✅ Should return 400 Bad Request
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Invalid product ID");
  });
});