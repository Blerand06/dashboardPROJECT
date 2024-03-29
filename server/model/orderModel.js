const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    order_number: {
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
    price: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: 'Pending',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
