const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        desc: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
