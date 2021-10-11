const express = require('express');
const router = express.Router();
const comment = require('./comment.js');

router.use('/:post-uid/comments', comment);

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
