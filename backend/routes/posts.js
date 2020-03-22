const express = require('express');
const PostsController = require('../_controllers/posts');
const extractFile = require('../middleware/file');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('', PostsController.getPosts);

router.get('/:id', PostsController.getPostById);

router.post('', checkAuth, extractFile, PostsController.creatPost);

router.put('/:id', checkAuth, extractFile, PostsController.updatePost);

router.delete('/:id', checkAuth, PostsController.deletePost);

module.exports = router;
