const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(
  'mongodb+srv://dibran:utAGGd7lmaE1F3Y9@cluster0-1aypd.mongodb.net/angular-node?retryWrites=true&w=majority',
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
    console.log('Connected to database!')
  })
  .catch((err) => {
    console.log('Connecting error: ', err)
  });

app.use(cors(), bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
