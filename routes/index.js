const express = require('express');
const router = express.Router();
const user = require('./user');
const like = require('./like');
const post = require('./post');
const Post = require('../models/post_info');
const Like = require('../models/like_info');
const Comment = require('../models/comment_info');
const auth = require('../middlewares/auth');
require('dotenv').config();

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: '타다, 라이딩',
    version: '1.0.0',
    description: '타다, 라이딩. API 설계',
  },
  host: 'localhost:5000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./swagger/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
router.get('/swagger.json', (req, res) => {
  res.setHeader('content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/api/users', user);
router.use('/api/posts', post);
router.use('/api/likes', like);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* 게시글 불러오기 */
router.get('/', auth.justCheckAuth, async (req, res) => {
  try {
    const user = req.user;
    const posts = await Post.find({}, { _id: false, __v: false });
    let pressedPosts = [];
    // 유저가 로그인 한 경우
    if (user) {
      const tmpPressedPosts = await Like.find(
        { userUid: user.userUid },
        { _id: false, userUid: false, likeState: false, __v: false }
      );
      // 조회한 정보가 1개 이상일 경우
      if (tmpPressedPosts.length >= 1) {
        // 배열형식으로 보내기 위한 코드
        for (let data of tmpPressedPosts) {
          pressedPosts.push(data.postUid);
        }
      }
      return res.status(200).json({ success: true, posts, user, pressedPosts });
    }
    // 유저가 로그인을 안 한 경우
    return res.status(200).json({ success: true, posts, user, pressedPosts });
  } catch (err) {
    console.log('게시글 불러오기 중, 예상치 못하게 발생한 에러:', err);
    return res.status(500).json({
      success: false,
      msg: '게시글 불러오기 중, 예상치 못한 에러가 발생했습니다.',
    });
  }
});

// 게시글 상세 페이지 불러오기
router.get('/posts/:postUid', auth.justCheckAuth, async (req, res, next) => {
  try {
    let user = [];
    // 로그인한 유저인 경우
    if (req.user) {
      user = req.user;
    }

    const postUid = req.params.postUid;

    //해당 포스트의 정보를 가져온다.
    const targetPost = await Post.findOne(
      { postUid },
      { _id: false, __v: false }
    );

    let comments = [];
    // 가공하기 전 코멘트들
    comments = await Comment.find(
      { postUid },
      { _id: false, __v: false, postUid: false }
    );

    return res.status(200).json({
      success: true,
      post: targetPost,
      comments,
      user,
      msg: '성공적으로 상세페이지에 접근했습니다.',
    });
  } catch (err) {
    console.log('게시글 상세 페이지 열다가 발생한 에러: ', err);
    return res.status(500).json({
      success: false,
      msg: '게시글 상세 페이지 불러오기 중, 예상치 못한 에러가 발생했습니다.',
    });
  }
});

// 마이페이지
router.get('/users/:userUid', auth.isAuth, (req, res, next) => {
  if (req.user) {
    // 로그인 한 유저인 경우
    return res.status(200).json({ success: true, user: req.user });
  } else {
    // 로그인 안한 유저인 경우,
    return res.status(401).json({ success: false });
  }
});

module.exports = router;
