const Chat = require('../model/chatModel');

const getChatList = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChat = async (req, res) => {};

module.exports = { getChatList, getChat };
