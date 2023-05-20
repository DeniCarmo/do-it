const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth_route = require('./routes/auth');
const list_route = require('./routes/list');
require('dotenv').config();

const port = 3030;
const hostname = 'localhost';
const mongodb = process.env.mongodb;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', auth_route);
app.use('/list', list_route);

mongoose.set('strictQuery', true);
mongoose
  .connect(mongodb)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, hostname, () => {
  console.log(`Server running on port ${port}`);
});
