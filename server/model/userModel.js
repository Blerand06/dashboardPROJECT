const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: 'Custom error message for invalid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please enter a password that is at least 6 characters'],
      minlength: [6],
    },
    phone: {
      type: String,
      default: 'empty',
    },
    education: {
      type: String,
      default: 'empty',
    },
    address: {
      type: String,
      default: 'empty',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isOnline: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
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
    throw Error('Incorrect password.');
  }
  throw Error('Incorrect email.');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
