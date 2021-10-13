const express = require('express');
const router = express.Router({ mergeParams: true });
const comment = require('./comment.js');
const uuid = require('uuid');
const auth = require('../middlewares/auth');
const Post = require('../models/post_info');
const User = require('../models/user_info');

router.use('/:postUid/comments', comment);

// 게시글 등록 API
router.post('/', auth.isAuth, async (req, res) => {
  try {
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

    const postRegister = req.user.userUid;
    const postUid = uuid.v1();
    const postState = true;
    const participants = [req.user.userUid];
    const postLikeCnt = 0;

    // 포스트 등록
    await Post.create({
      postUid,
      postTitle,
      postDesc,
      postDate,
      postRegister,
      origin,
      destination,
      postState,
      postImage,
      limitedUserNum,
      postLikeCnt,
      startTime,
      participants,
    });

    const targetUser = await User.findOne(
      { userUid: req.user.userUid },
      { _id: false }
    );
    const participatedPost = targetUser.participatedPost.push(postUid);

    // 유저 정보에서 참여한 게시글 목록에 내용 추가.
    await User.updateOne(
      { userUid: req.user.userUid },
      { $set: { participatedPost } }
    );

    return res
      .status(201)
      .json({ success: true, msg: '성공적으로 게시글이 등록되었습니다.' });
  } catch (err) {
    console.log('게시글 등록 기능 중 발생한 에러: ', err);
    return res
      .status(500)
      .json({ success: false, msg: '게시글 등록 중 에러가 발생했습니다.' });
  }
});

// 게시글 수정 API
router.put('/:postUid', async (req, res) => {
  const { postUid } = req.params;
  const {
    postTitle,
    postDesc,
    limitedUserNum,
    origin,
    destination,
    postImage,
    startTime,
  } = req.body;
  const post = await Post.findOne({ postUid });

  if (postUid === post.postUid) {
    await Post.updateOne(
      { postUid: postUid },
      {
        $set: {
          postTitle,
          postDesc,
          limitedUserNum,
          origin,
          destination,
          postImage,
          startTime,
        },
      }
    );
    res
      .status(201)
      .send({ success: true, msg: '성공적으로 게시글이 수정되었습니다.' });
  } else {
    res
      .status(500)
      .send({ success: false, msg: '게시글 수정 중 에러가 발생했습니다.' });
  }
});

// 게시글 삭제 API
router.delete('/:postUid', async (req, res) => {
  const { postUid } = req.params;
  const post = await Post.findOne({ postUid });

  if (postUid === post.postUid) {
    await Post.deleteOne({ postUid });
    res.send({});
  } else {
    res.send({});
  }
});

module.exports = router;
