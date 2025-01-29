const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const app = express();

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);


module.exports = app;