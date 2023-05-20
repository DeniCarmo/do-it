const mongoose = require('mongoose');
const List = require('./list');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: [List.schema],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
