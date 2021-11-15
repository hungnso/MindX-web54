require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const AuthRouter = require("./modules/auth");
const ProductRouter = require("./modules/products");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  const app = express();

  app.use(express.json());

  app.use("/api/auth", AuthRouter);
  app.use("/api/products", ProductRouter);

  app.listen(process.env.PORT || 9000, (err) => {
    if (err) throw err;

    console.log("Server connected");
  });
}

main();
