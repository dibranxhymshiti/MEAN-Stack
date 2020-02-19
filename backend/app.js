const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts')
const app = express();

mongoose.connect(
  'mongodb+srv://dibran:utAGGd7lmaE1F3Y9@cluster0-1aypd.mongodb.net/angular-node?retryWrites=true&w=majority',
  {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database!')
  })
  .catch((err) => {
    console.log('Connecting error: ', err)
  });

app.use(cors(), bodyParser.json());
app.use('/api/posts', postRoutes);

module.exports = app;
