const mongoose = require('mongoose');
const Item = require('./listItem');

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    items: [Item.schema],
  },
  { timestamps: true }
);

const List = mongoose.model('list', listSchema);

module.exports = List;
