const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    usreId: { type: String, required: true },
    customerId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, //complex type creation
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    delivery_status: { type: Number, default: "pending" },
    delivery_status: { type: Number, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
