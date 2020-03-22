const Post = require('../_models/Post');

exports.getPosts = (req, res) => {
  const postsPerPage = Post.find();
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;

  let allDocuments;
  if (pageSize && currentPage) {
    postsPerPage.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postsPerPage.then((documents) => {
    allDocuments = documents;
    return Post.countDocuments();
  })
    .then(count => {
      res.status(200).json({
        posts: allDocuments,
        postsCount: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching posts failed!'
      });
    });
};


exports.getPostById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: 'Post not found'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching post failed!'
      })
    });
};


exports.creatPost = (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    comment: req.body.comment,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.id
  });

  post.save()
    .then(createdPost => {
      res.status(201).json({
        id: createdPost._id,
        title: createdPost.title,
        comment: createdPost.comment,
        imagePath: createdPost.imagePath,
        creator: createdPost.creator
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    });
};


exports.updatePost = (req, res) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    comment: req.body.comment,
    imagePath: req.body.imagePath,
    creator: req.userData.id
  });

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    post.imagePath = url + '/images/' + req.file.filename;
  }

  Post.updateOne({_id: req.params.id, creator: req.userData.id}, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json(post);
      } else {
        res.status(401).json({message: 'Not authorized!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Couldnt update post!'
      });
    });
};


exports.deletePost = (req, res) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.id})
    .then(response => {
      if (response.n > 0) {
        res.status(200).json({message: 'Deleted Successfully'});
      } else {
        res.status(401).json({message: 'Not authorized!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Couldnt delete post!'
      })
    });
};
