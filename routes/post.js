const express = require('express');
const router = express.Router({ mergeParams: true });
const comment = require('./comment.js');
const uuid = require('uuid');
const auth = require('../middlewares/auth');
const Post = require('../models/post_info');

router.use('/:postUid/comments', comment);

// 게시글 등록 API
router.post('/', auth.isAuth, async (req, res) => {
  const {
    postTitle,
    postDesc,
    limitedUserNum,
    origin,
    destination,
    postImage,
    startTime,
    postDate,
  } = req.body;

  const postUid = uuid.v1();
  const postState = true;
  const participants = [req.userUid];
  const postLikeCnt = 0;
  await Post.create({
    postUid,
    postTitle,
    postDesc,
    postDate,
    origin,
    destination,
    postState,
    postImage,
    limitedUserNum,
    postLikeCnt,
    startTime,
    participants,
  });
});

module.exports = router;
