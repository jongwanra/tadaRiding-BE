const express = require('express');
const router = express.Router();
const Like = require('../models/like_info');
const Post = require('../models/post_info');
const auth = require('../middlewares/auth');

// 해당 게시물 좋아요 추가 기능
router.post('/:postUid', auth.isAuth, async (req, res) => {
  const { postUid } = req.params;
  const userUid = req.user.userUid;
  try {
    await Like.create({ userUid, postUid });
    const post = await Post.findOne({ postUid }, { _id: false }); // 게시물 카운터
    const postLikeCnt = post.postLikeCnt + 1;

    await Post.updateOne({ postUid }, { $set: { postLikeCnt } });
    return res
      .status(200)
      .json({ success: true, postLikeCnt, msg: '좋아요 추가!' });
  } catch (err) {
    console.log('좋아요 추가 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});

// 해당 게시물의 좋아요 취소 기능
router.delete('/:postUid', auth.isAuth, async (req, res) => {
  const { postUid } = req.params;
  const userUid = req.user.userUid;
  try {
    await Like.deleteOne({ userUid, postUid });
    const post = await Post.findOne({ postUid }, { _id: false });
    const postLikeCnt = post.postLikeCnt - 1;

    await Post.updateOne({ postUid }, { $set: { postLikeCnt } });
    return res
      .status(200)
      .json({ success: false, postLikeCnt, msg: '좋아요 취소!' });
  } catch (err) {
    console.log('좋아요 취소 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});
module.exports = router;
