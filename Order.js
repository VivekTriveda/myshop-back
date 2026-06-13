const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  username: String,
  products: Array,
  total: Number,
  paymentStatus: String
});

module.exports = mongoose.model("Order", OrderSchema);