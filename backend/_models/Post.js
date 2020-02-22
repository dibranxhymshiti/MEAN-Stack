const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  comment: {type: String, required: true},
  imagePath: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);
