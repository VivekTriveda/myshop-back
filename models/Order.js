const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  mobile: String,
  paymentMethod: String,
  totalAmount: Number,
  cartItems: Array
}, { timestamps:true });

module.exports =
mongoose.model("Order", orderSchema);
