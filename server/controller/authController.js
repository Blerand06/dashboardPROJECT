const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 10 * 30 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    "blerand secret",
    {
      expiresIn: maxAge,
    }
  );
};

const register = async (req, res) => {
  const { name, username, email, password, check } = req.body;

  try {
    const user = await User.create({ name, username, email, password, check });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        err.message || "Some error occurred while creating a create operation!",
    });
  }
};

const restrict = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.render("include/_restriction");
    }
    next();
  };
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: "success" });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ status: "failure", error: "Incorrect email or password" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ status: "failure", error: "Incorrect email or password" });
  }
};
module.exports = { register, login, logout, restrict };
