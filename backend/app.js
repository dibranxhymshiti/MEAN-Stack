const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./_models/Post');
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


app.get('/api/posts', (req, res) => {
  Post.find().then((documents) => {
    res.status(200).json(documents);
  })
});

app.post('/api/posts', (req, res) => {
  const post = new Post(req.body);
  post.save().then(result => {
    res.status(201).json(result);
  });
});

app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}).then(response => {
    console.log(response);
    res.status(200).json({
      message: 'Deleted Successfully'
    })
  })
});


module.exports = app;
