const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        enum: ["Toys", "Fashion and Beauty", "Electronics", "Books", "Gardening"],
        default: "Toys",
        required: true,
    },
    price: {
        type: Number,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
