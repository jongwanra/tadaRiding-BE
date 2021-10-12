const express = require('express');
const router = express.Router({ mergeParams: true });
const comment = require('./comment.js');

router.use('/:postUid/comments', comment);

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
