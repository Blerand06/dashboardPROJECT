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

const updateUser = (req, res) => {
  if(!req.body) {
    return res.status(400).send({message: "Data to update cannot be empty!"})
  }

  const id = req.body.id;
  UserList.findByIdAndUpdate(id, req.body, {new:true}).then((data)=> {
    if(!data){
      res.status(404).send({
        message: `Cannot Update user with ${id}. Maybe user not found.`
      });
    } else {
      res.send({data, status:'success'})
    }
  }).catch((error)=> {
    res.status(500).send({message: "Error Update User Information",status:'fail'})
  });
};

const deleteUser = (req, res) => {
  const id= req.body.id

  UserList.findByIdAndDelete(id).then((data)=>{
    if(!data){
      res.status(404).send({
        message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`
      ,status:'fail'});
    } else {
      res.send({
        message: 'User was deleted successfully!',status:'success'
      });
    }
  }).catch((error)=>{
    res.status(500).send({message: 'Could not delete user with id: ' +  id})
  })
}

module.exports = {
  registerUserList,
  getUserList,
  updateUser, 
  deleteUser
};
