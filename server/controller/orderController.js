const Order = require('../model/orderModel');

const registerOrder = async (req, res) => {
  const { name, description, price, owner, address, phone, offer, paid } =
    req.body;
  try {
    let order_number = 1;
    const orderOnDb = await Order.findOne()
      .sort({ createdAt: -1 })
      .select('order_number');
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
      user: req.user._id,
    });
    res.status(201).json({ user: user._id, status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        err.message || 'Some error occurred while creating a create operation!',
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('user');
    res.send({ data: orders, status: 'success' });
  } catch (e) {
    res.send({ data: [], status: 'fail' });
  }
};

const updateOrder = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update cannot be empty!' });
  }

  const id = req.body.id;
  Order.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update order with id ${id}. Maybe order not found.`,
          status: 'fail',
        });
      } else {
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Error updating order information',
        status: 'fail',
      });
    });
};

const deleteOrder = (req, res) => {
  const id = req.body.id;

  Order.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fails',
        });
      } else {
        res.send({
          message: 'Order was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: 'Could not delete order with id: ' + id });
    });
};

module.exports = { registerOrder, getOrders, updateOrder, deleteOrder };
