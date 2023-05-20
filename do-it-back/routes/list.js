const express = require('express');
const {
  createList,
  tokenVerification,
  deleteList,
  addItem,
  updateListItemStatus,
  deleteItem,
} = require('../controllers/listController');
const list_route = express.Router();

list_route.post('/create', tokenVerification, createList);
list_route.delete('/delete', tokenVerification, deleteList);
list_route.post('/add-item', tokenVerification, addItem);
list_route.put('/update-item', tokenVerification, updateListItemStatus);
list_route.delete('/delete-item', tokenVerification, deleteItem);

module.exports = list_route;
