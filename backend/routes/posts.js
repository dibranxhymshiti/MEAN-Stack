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
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const upload = multer({storage: storage});

router.get('', (req, res) => {
  const postsPerPage = Post.find();
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;

  let allDocuments;
  if (pageSize && currentPage) {
    postsPerPage.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postsPerPage
    .then((documents) => {
      allDocuments = documents;
      return Post.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        posts: allDocuments,
        postsCount: count
      })
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

router.post('', upload.single('image'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    comment: req.body.comment,
    imagePath: url + '/images/' + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      id: createdPost._id,
      title: createdPost.title,
      comment: createdPost.comment,
      imagePath: createdPost.imagePath
    });
  });
});

router.put('/:id', upload.single('image'), (req, res) => {

  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    comment: req.body.comment,
    imagePath: req.body.imagePath
  });

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    post.imagePath = url + '/images/' + req.file.filename;
  }

  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json(post);
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
