const Order = require('../model/orderModel');
const User = require('../model/userModel');

const loginPage = (req, res) => {
  res.render('user_login');
};

const signupPage = (req, res) => {
  res.render('user_register');
};

const mainPage = (req, res) => {
  res.render('index');
};

const updateUser = async (req, res) => {
  try {
    const userlist = await User.findById(req.params.id);
    res.render('update_user', { userlist });
  } catch (e) {
    res.redirect('back');
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.render('update_order', { order });
  } catch (error) {
    res.redirect('back');
  }
};

const messageRoom = (req, res) => {
  res.render('message_room');
};

const orders = (req, res) => {
  res.render('orders');
};

const newOrders = (req, res) => {
  res.render('newOrders');
};

const users = (req, res) => {
  res.render('users');
};

const newUser = (req, res) => {
  res.render('newUser');
};

module.exports = {
  loginPage,
  signupPage,
  mainPage,
  updateUser,
  messageRoom,
  orders,
  newOrders,
  users,
  newUser,
  updateUser,
  updateOrder,
};
