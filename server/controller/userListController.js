const UserList = require("../model/userListModel");

const registerUserList = async (req, res) => {
  const { name, username, email, phone, education, address } = req.body;
  try {
    let order_number = 1;
    const userListOnDb = await UserList.findOne()
      .sort({ createdAt: -1 })
      .select("order_number");
    if (userListOnDb) {
      order_number = parseInt(userListOnDb.order_number) + 1;
    }
    const userList = await UserList.create({
      name,
      username,
      email,
      phone,
      education,
      address,
      order_number,
    });
    res.status(201).json({ userList: userList._id, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        error.message ||
        "Some error occurred while creating a create operation!",
    });
  }
};

const getUserList = async (req, res) => {
  try {
    const userLists = await UserList.find();
    res.send({ data: userLists, status: "success" });
  } catch (error) {
    res.send({ data: [], status: "fail" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await UserList.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: `Cannot update user with id ${id}. User not found.`,
        success: false,
      });
    }
    res.json({
      message: "User updated successfully",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating user information",
      success: false,
    });
  }
};

module.exports = {
  registerUserList,
  getUserList,
  updateUser,
};
