const User = require('../model/userModel');

// REGISTER USER
const registerUserList = async (req, res) => {
  const { name, username, email, password, phone, education, address } =
    req.body;
  try {
    let order_number = 1;
    const userListOnDb = await User.findOne()
      .sort({ createdAt: -1 })
      .select('order_number');
    if (userListOnDb) {
      order_number = parseInt(userListOnDb.order_number) + 1;
    }
    const userList = await User.create({
      name,
      username,
      email,
      password,
      phone,
      education,
      address,
      order_number,
    });
    res.status(201).json({ userList: userList._id, status: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        error.message ||
        'Some error occurred while creating a create operation!',
    });
  }
};

// GET USER
const getUserList = async (req, res) => {
  try {
    const userLists = await User.find();
    res.send({ data: userLists, status: 'success' });
  } catch (error) {
    res.send({ data: [], status: 'fail' });
  }
};

// UPDATE USER
const updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update cannot be empty!' });
  }

  const id = req.body.id;
  const password = req.body.password;
  delete req.body.password;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found.`,
        });
      } else {
        if (password) {
          data.password = password;
          await data.save();
        }
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: 'Error Update User Information', status: 'fail' });
    });
};

// DELETE YSER
const deleteUser = (req, res) => {
  const id = req.body.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fail',
        });
      } else {
        res.send({
          message: 'User was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: 'Could not delete user with id: ' + id });
    });
};

module.exports = {
  registerUserList,
  getUserList,
  updateUser,
  deleteUser,
};
