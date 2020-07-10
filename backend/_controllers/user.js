const User = require('../_models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            user: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Email already exist!'
          })
        });
    });
};

exports.loginUser = (req, res) => {
  let currentUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Invalid authentication credentials!'
        });
      }
      currentUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Authenticate Failed'
        });
      }
      const token = jwt.sign(
        {email: currentUser.email, id: currentUser._id},
        'secret_this_should_be_longer',
        {expiresIn: '1h'});

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: currentUser._id
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    });
};
