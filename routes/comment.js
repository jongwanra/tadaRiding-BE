const express = require('express');
const router = express.Router({ mergeParams: true });
const uuid = require('uuid');
const Comment = require('../models/comment_info');
const auth = require('../middlewares/auth');
// 댓글 추가 API(로그인 권한 필요)
router.post('/', auth.isAuth, async (req, res) => {
  try {
    // 댓글 내용및 댓글 작성 날짜 받아오기
    const postUid = req.params.postUid;
    const { commentDesc, commentDate } = req.body;
    const commentUid = uuid.v1();
    const userUid = req.user.userUid;
    const userNickname = req.user.userNickname;

    // DB에 댓글 추가
    await Comment.create({
      postUid,
      commentUid,
      userUid,
      userNickname,
      commentDesc,
      commentDate,
    });

    res.status(201).json({
      success: true,
      msg: '성공적으로 댓글이 등록되었습니다.',
    });
  } catch (err) {
    console.log('댓글 추가 API 에러', err);
    res.status(500).json({
      success: false,
      msg: '댓글을 추가하는데 문제가 발생했습니다.',
    });
  }
});

// 댓글 수정 기능(로그인 권한 필요)
router.put('/:commentUid', auth.isAuth, async (req, res) => {
  try {
    const { postUid, commentUid } = req.params;
    // 클라이언트로부터 바꿀 댓글 내용과, 편집 날짜를 받는다.
    const { commentDesc, commentDate } = req.body;

    // 해당 게시물의 해당 댓글ID의 댓글 내용을 수정한다.
    await Comment.updateOne(
      { postUid, commentUid },
      { $set: { commentDesc, commentDate } }
    );
    res
      .status(201)
      .json({ success: true, msg: '성공적으로 댓글이 수정되었습니다.' });
  } catch (error) {
    console.log('댓글 수정 기능 중 에러 발생: ', error);
    res.status(500).json({
      success: false,
      msg: '댓글을 수정하는데 문제가 발생했습니다',
    });
  }
});

// 댓글 삭제 기능(로그인 권한 필요)
router.delete('/:commentUid', auth.isAuth, async (req, res) => {
  try {
    const { postUid, commentUid } = req.params;
    await Comment.deleteOne({ postUid, commentUid });
    res
      .status(200)
      .json({ success: true, msg: '성공적으로 댓글이 삭제되었습니다.' });
  } catch (error) {
    console.log('댓글 삭제 기능 중 에러 발생: ', error);
    res.status(500).json({
      result: false,
      msg: '댓글을 삭제하는데 문제가 발생했습니다.',
    });
  }
});

module.exports = router;
