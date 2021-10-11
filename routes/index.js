const express = require('express');
const router = express.Router();
const user = require('./user');
const like = require('./like');
const post = require('./post');

router.use('/api/users', user);
router.use('/api/posts', post);
router.use('/api/likes', like);

/* 게시글 불러오기 */
router.get('/', function (req, res, next) {
  res.send('게시글 불러오기');
});

// 게시글 상세 페이지 불러오기
router.get('/posts/:post-uid', (req, res, next) => {
  res.send('게시글 상세 페이지');
});

// 마이페이지
router.get('/users/:user-uid', (req, res, next) => {
  res.send('마이페이지');
});

module.exports = router;
