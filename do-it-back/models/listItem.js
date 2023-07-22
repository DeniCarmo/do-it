const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
