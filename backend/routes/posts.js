const express = require('express');
const Post = require('../_models/Post');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimeType];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimeType];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.get('', (req, res) => {
  Post.find().then((documents) => {
    res.status(200).json(documents);
  })
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found'
      })
    }
  });
});

router.post('', (req, res) => {
  const post = new Post(req.body);
  post.save().then(result => {
    res.status(201).json(result);
  });
});

router.put('/:id', (req, res) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    comment: req.body.comment
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json(result);
  })
});

router.delete('/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}).then(response => {
    res.status(200).json({
      message: 'Deleted Successfully'
    })
  })
});

module.exports = router;
