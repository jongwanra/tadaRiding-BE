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

    const postRegister = req.user.userNickname;
    const postUid = uuid.v1();
    const postState = true;
    const likeState = false;
    const attendUserNicknames = [];
    attendUserNicknames.push(postRegister);
    console.log('attendUserNicknames: ', attendUserNicknames);
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
      attendUserNicknames,
      likeState,
    });

    // 유저 정보에서 참여한 게시글 목록에 내용 추가.
    await User.updateOne(
      { userUid: req.user.userUid },
      { $push: { participatedPost: postUid } }
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
router.put('/:postUid', auth.isAuth, async (req, res) => {
  try {
    const { postUid } = req.params;
    const {
      postTitle,
      postDesc,
      origin,
      destination,
      postState,
      postImage,
      limitedUserNum,
      startTime,
    } = req.body;

    await Post.updateOne(
      { postUid: postUid },
      {
        $set: {
          postTitle,
          postDesc,
          origin,
          destination,
          postState,
          postImage,
          limitedUserNum,
          startTime,
        },
      }
    );
    return res
      .status(201)
      .json({ success: true, msg: '성공적으로 게시글이 수정되었습니다.' });
  } catch (err) {
    console.log('게시글 수정 기능 중 발생한 에러: ', err);
    return res
      .status(500)
      .json({ success: false, msg: '게시글 등록 중 에러가 발생했습니다.' });
  }
});

// 게시글 삭제 API
router.delete('/:postUid', auth.isAuth, async (req, res) => {
  try {
    const { postUid } = req.params;
    await Post.deleteOne({ postUid });
    return res
      .status(200)
      .json({ success: true, msg: '성공적으로 게시글이 삭제되었습니다.' });
  } catch (err) {
    console.log('게시글 삭제 기능 중 발생한 에러: ', err);
    return res
      .status(500)
      .json({ success: false, msg: '게시글 삭제 중 에러가 발생했습니다.' });
  }
});

// 참여 하기 기능
// /api/posts/:postUid/:userUid
router.post('/:postUid/:userUid', auth.isAuth, async (req, res) => {
  try {
    const targetUser = req.user;
    const userNickname = targetUser.userNickname;
    const { postUid, userUid } = req.params;
    // 예외 시켜야될 구문
    const targetPost = await Post.findOne(
      { postUid },
      { _id: false, __v: false }
    );

    // 꽉찼는지를 확인
    const limitedUserNum = targetPost.limitedUserNum;
    const currentUserNum = targetPost.attendUserNicknames.length;
    const attendUserNicknames = targetPost.attendUserNicknames;
    const postState = targetPost.postState;

    if (limitedUserNum <= currentUserNum) {
      res.json({
        success: false,
        msg: '인원 수가 꽉 찬 상태입니다.',
      });
      return;
    }

    // 이미 참석했는지
    if (attendUserNicknames.indexOf(userNickname) != -1) {
      res.json({
        success: false,
        msg: '이미 참석된 회원입니다.',
      });
      return;
    }

    // postState 열려져 있는지
    console.log('postState:', postState);
    if (!postState) {
      res.json({
        success: false,
        msg: '해당 게시글은 마감되었습니다.',
      });
      return;
    }

    // 1. user_info안에 participatedPost 에 postUid 추가
    await User.updateOne(
      { userUid: req.user.userUid },
      { $push: { participatedPost: postUid } }
    );

    // 2. post_info안에 attendUserNicknames 에 userNickname 추가
    await Post.updateOne(
      { postUid: postUid },
      {
        $push: { attendUserNicknames: userNickname },
      }
    );
    res.status(200).json({
      success: true,
      msg: '해당 포스트에 참가되었습니다.',
    });
  } catch (err) {
    console.log('참여하기 기능 중 알 수 없는 에러가 발생했습니다.: ', err);
    res.status(500).json({
      success: false,
      msg: '서버 쪽에서 알 수 없는 에러가 발생'
    })
  }
});

// 참여 취소 기능
router.delete('/:postUid/:userUid', auth.isAuth, async (req, res) => {
  try {
  } catch (err) {
    console.log('참여 취소 기능 중 알 수 없는 에러가 발생했습니다.: ', err);
  }
});

module.exports = router;
