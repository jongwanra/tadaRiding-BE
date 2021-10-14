const express = require('express');
const router = express.Router();
const Like = require('../models/like_info');
const Post = require('../models/post_info');
const auth = require('../middlewares/auth');

router.post('/:postUid', auth.isAuth, async (req, res) => {
  try {
    const { postUid } = req.params;
    const userUid = req.user.userUid;
    const likeData = await Like.findOne({ userUid, postUid });
    const { postLikeCnt } = await Post.findOne({ postUid });
    if (!likeData) {
      const likeState = 1;
      await Like.create({ userUid, postUid, likeState });
      await Post.findOneAndUpdate(postUid, {
        $set: { postLikeCnt: postLikeCnt - 1 },
      });
    } else {
      if (likeData.likeState === 1) {
        await Like.findOneAndUpdate({ userUid, postUid, likeState: 0 });
        await Post.findOneAndUpdate(postUid, {
          $set: { postLikeCnt: postLikeCnt - 1 },
        });
      } else {
        await Like.findOneAndUpdate({ userUid, postUid, likeState: 1 });
        await Post.findOneAndUpdate(postUid, {
          $set: { postLikeCnt: postLikeCnt + 1 },
        });
      }
    }
    return res.status(201).json({ success: true });
  } catch (err) {
    console.log('좋아요 추가 기능에서 발생한 에러', err);
    return res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});
module.exports = router;
