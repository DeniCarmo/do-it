const mongoose = require('mongoose');
const User = require('../models/user');
const List = require('../models/list');
const jwt = require('jsonwebtoken');
const { login } = require('./authController');
const Item = require('../models/listItem');
const { off } = require('../models/listItem');

exports.createList = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.id;

  if (!name) {
    return res.status(400).json({
      msg: 'Onde or more fields are missing.',
      code: 400,
    });
  }

  try {
    const user = await User.findById(userId, '-password').exec();

    const listFound = user.lists.find((item) => item.name === name);

    if (user && !listFound) {
      const newList = new List({
        name,
        description,
      });

      user.lists.push(newList);

      user.save().then(() => {
        return res.status(200).json({
          msg: 'Successful',
          code: 200,
        });
      });
    } else if (listFound) {
      return res.status(403).json({
        msg: 'List already exists',
        code: 403,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteList = async (req, res) => {
  const { id } = req.body;
  const userId = req.id;
  const user = await User.findById(userId, '-password').exec();

  const newListArr = user.lists.filter((item) => !item._id.equals(id));

  user.lists = newListArr;

  user.save();
};

exports.addItem = async (req, res) => {
  const { title, listId } = req.body;
  const userId = req.id;

  if (!title) {
    return res.status(400).json({
      mdg: 'Field name is missing.',
      code: 400,
    });
  } else if (!listId) {
    return res.status(400).json({
      mdg: 'No list were specified.',
      code: 400,
    });
  }

  try {
    const user = await User.findById(userId, '-password').exec();

    let listItemFound = null;

    if (user) {
      user.lists.map((list) => {
        if (list._id.equals(listId)) {
          listItemFound = list.items.find((item) => item.title === title);
        }
      });
    }

    if (user && !listItemFound) {
      const newItem = new Item({ title: title.title });

      user.lists.map((list) => {
        if (list._id.equals(listId)) {
          list.items.push(newItem);
        }
      });

      user.save().then(() => {
        return res.status(200).json({
          msg: 'Successful',
          code: 200,
        });
      });
    } else if (listItemFound) {
      return res.status(403).json({
        msg: 'The names must be unique.',
        code: 403,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateListItemStatus = async (req, res) => {
  const { done, id, listId } = req.body;
  const userId = req.id;

  if (!id) {
    return res.status(403).json({
      msg: 'Item id is missing',
      code: 403,
    });
  }

  if (!listId) {
    return res.status(403).json({
      msg: 'List id is missing',
      code: 403,
    });
  }

  try {
    const user = await User.findById(userId, '-password').exec();

    if (user && user.lists) {
      user.lists.map((list) => {
        if (list._id.equals(listId)) {
          list.items.find((item) => item._id.equals(id)).done = done;
        }
      });
    }

    user.save().then(() => {
      return res.status(200).json({
        msg: 'Successful',
        code: 200,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteItem = async (req, res) => {
  const { id, listId } = req.body;
  const userId = req.id;

  if (!id) {
    return res.status(403).json({
      msg: 'Item id is missing',
      code: 403,
    });
  }

  if (!listId) {
    return res.status(403).json({
      msg: 'List id is missing',
      code: 403,
    });
  }

  try {
    const user = await User.findById(userId, '-password').exec();
    let itemIndex = null;

    if (user && user.lists) {
      user.lists.map((list) => {
        if (list._id.equals(listId)) {
          itemIndex = list.items.findIndex((item) => item._id.equals(id));
          if (itemIndex >= 0) list.items.splice(itemIndex, 1);
        }
      });
    }

    user.save().then(() => {
      return res.status(200).json({
        msg: 'Successful',
        code: 200,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.tokenVerification = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({
        msg: 'Unauthorized',
      });
      return;
    }

    jwt.verify(token, process.env.jwts, (err, user) => {
      if (err) {
        return res.status(401).json({
          msg: 'Invalid access token.',
        });
      }

      req.id = user.id;

      next();
    });
  } catch (err) {
    console.log(err);
  }
};
