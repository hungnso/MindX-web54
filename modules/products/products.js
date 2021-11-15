const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//// Xác định các kiểu dữ liệu cho Product

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    isPromotion: Boolean,
    isFreeShip: Boolean,
    category: {
      type: mongoose.Types.ObjectId,
    },
  },

  {
    timestamps: true,
  }
);
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
