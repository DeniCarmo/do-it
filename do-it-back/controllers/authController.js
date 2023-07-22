const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const usernameFound = await User.findOne({ username }).exec();
  const emailFound = await User.findOne({ email }).exec();

  try {
    if (!username && !password && !email) {
      return res.status(400).json({
        msg: 'One or more fields are missing.',
      });
    }

    if (usernameFound) {
      return res.status(403).json({
        msg: 'Username already exists.',
      });
    } else if (emailFound) {
      return res.status(403).json({
        msg: 'Email already registered.',
      });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    newUser.save();

    res.json({
      msg: 'Successful!',
      code: 200,
    });

    next();

    return;
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  const passCheck =
    userFound && userFound.password ? await bcrypt.compare(password, userFound.password) : false;
  const token =
    userFound && userFound._id
      ? jwt.sign({ id: userFound._id }, process.env.jwts, { expiresIn: '1hr' })
      : false;
  const tokenExpiration = 1;

  res.cookie('token', token, {
    httpOnly: true,
    masAge: tokenExpiration,
  });

  try {
    if (userFound && passCheck) {
      return res.status(200).json({
        msg: 'Login successful!',
        token: token,
        expiration: tokenExpiration,
        code: 200,
      });
    } else {
      res.status(401).json({
        msg: 'Email or password incorrect.',
      });
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  const emailFound = await User.findOne({ email }).exec();

  try {
    if (!email || !password) {
      return res.status(400).json({
        msg: 'One or more fields are missing.',
      });
    }

    if (emailFound) {
      User.findOneAndUpdate({ email: email }, { password: hashedPass });
    }

    next();

    return;
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

exports.userInfo = async (req, res) => {
  const userId = req.id;
  const user = await User.findById(userId, '-password').exec();

  try {
    if (!user) {
      return res.status(400).json({
        msg: 'User not found',
      });
    }

    return res.status(200).json({
      user,
      code: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    res.clearCookie(token);
    res.status(200).json({
      msg: 'Logout succesful.',
    });
  } catch (err) {
    console.log(err);
  }
};
