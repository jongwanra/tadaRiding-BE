const express = require('express');
const router = express.Router();
const Like = require('../models/like_info');
const Post = require('../models/post_info');
const auth = require('../middlewares/auth');

// 해당 게시물이 좋아요 +1
router.post('/:postUid', auth.isAuth, async (req, res) => {
  const { postUid } = req.params;
  const userUid = req.userUid;
  try {
    await Like.create({ userUid, postUid });
    const post = await Post.findOne({ postUid }); // 게시물 카운터
    const postLikeCnt = post.postLikeCnt + 1;

    await Post.findByIdAndUpdate(postUid, { $set: { likeState: postLikeCnt } }); //
    res.send({ result: 'suceess' });
  } catch (error) {
    res.send();
  }
});

// 해당 게시물이 좋아요 -1
router.delete('/:postUid', auth.isAuth, async (req, res) => {
  const { postUid } = req.params;
  const userUid = req.userUid;
  try {
    await Like.findByIdAndDelete({ userUid, postUid });
    const post = await Post.findOne({ postUid });
    const postLikeCnt = post.postLikeCnt + 1;

    await Post.findByIdAndUpdate(postUid, {
      $set: { likeState: updateLikeCnt },
    });
    res.send({ result: 'suceess' });
  } catch (error) {
    res.send();
  }
});
module.exports = router;
