const express = require('express');
const router = express.Router();
const Like = require('../models/like_info');
const Post = require('../models/post_info');
const auth = require('../middlewares/auth');

router.post('/:postUid', auth.isAuth, async (req, res) => {
  try {

    const { postUid } = req.params; 
    const userUid = req.user.userUid;

    // 로그인한 유저가 해당 게시글을 눌렀던 적이 있는지 확인
    const likeData = await Like.findOne({ userUid, postUid });
    const { postLikeCnt } = await Post.findOne({ postUid });
    
    // 눌렀던 적이 없는 경우
    if (!likeData) {
      // 새로운 테이블 생성
      const likeState = 1;
      await Like.create({ userUid, postUid,likeState });
      await Post.findOneAndUpdate(postUid, {
        $set: { postLikeCnt: postLikeCnt + 1 },
      });
    } else {
      // 눌렀던 적이 있는 경우, 토글
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
