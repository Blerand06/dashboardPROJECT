const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name correctly!"],
  },
  username: {
    type: String,
    required: [true, "Please enter your username!"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [
      4,
      "Minimum password length is 4 characters, please try again.",
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  check: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({
    $or: [{ email: email }, { username: email }],
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password.");
  }
  throw Error("Incorrect email.");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
