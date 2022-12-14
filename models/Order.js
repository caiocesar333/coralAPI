const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
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
        name: {
          type: String,
        },
      },
    ],
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" },
    address: { type: Object, required: true },
    paymentDetails:{ type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
