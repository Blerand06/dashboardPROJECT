const Order = require("../model/orderModel");

const registerOrder = async (req, res) => {
  const { name, description, price, owner, address, phone, offer, paid } =
    req.body;
  try {
    let order_number = 1;
    const orderOnDb = await Order.findOne()
      .sort({ createdAt: -1 })
      .select("order_number");
    if (orderOnDb) {
      order_number = parseInt(orderOnDb.order_number) + 1;
    }
    const user = await Order.create({
      name,
      description,
      price,
      owner,
      address,
      phone,
      offer,
      paid,
      order_number,
    });
    res.status(201).json({ user: user._id, status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating a create operation!",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send({ data: orders, status: "success" });
  } catch (e) {
    res.send({ data: [], status: "fail" });
  }
};
module.exports = { registerOrder, getOrders };
