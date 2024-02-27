const loginPage = (req, res) => {
  res.render("user_login");
};

const signupPage = (req, res) => {
  res.render("user_register");
};

const mainPage = (req, res) => {
  res.render("index");
};

const updateUser = (req, res) => {
  res.render("update_user");
};

const messageRoom = (req, res) => {
  res.render("message_room");
};

const orders = (req, res) => {
  res.render("orders");
};

const newOrders = (req, res) => {
  res.render("newOrders");
};

const users = (req, res) => {
  res.render("users");
};

const newUser = (req, res) => {
  res.render("newUser");
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
};
