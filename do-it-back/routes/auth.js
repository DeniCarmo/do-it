const express = require('express');
const {
  register,
  login,
  tokenVerification,
  userInfo,
  logout,
  resetPassword,
} = require('../controllers/authController');
const auth_route = express.Router();

auth_route.post('/register', register);
auth_route.post('/login', login);
auth_route.put('/reset-password', resetPassword);
auth_route.get('/logout', tokenVerification, logout);
auth_route.get('/dashboard', tokenVerification, userInfo);

module.exports = auth_route;
