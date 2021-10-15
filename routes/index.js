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
    const tmpPosts = await Post.find({}, { _id: false, __v: false });
    const posts = tmpPosts.toObject();

    console.log('posts:', posts);
    // 유저가 로그인 한 경우
    if (user) {
      const pressedPosts = await Like.find(
        { userUid: user.userUid, likeState: 1 },
        { _id: false, userUid: false, likeState: false, __v: false }
      );

      for (let post of posts) {
        if (pressedPosts.includes(post.postUid)) {
          post.likeState = true;
        }
      }

      return res.status(200).json({ success: true, posts, user });
    }
    // 유저가 로그인을 안 한 경우
    return res.status(200).json({ success: true, posts, user });
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
    const postUid = req.params.postUid;
    let user = [];
    let likeState = false;
    // 로그인한 유저인 경우
    if (req.user) {
      user = req.user;
      const userUid = req.user.userUid;
      // 로그인한 유저가 해당 게시글에 좋아요를 눌렀는지를 살펴보기
      const likeData = await Like.findOne({ userUid, postUid });
      // DB에 존재하다면, 해당 값으로 likeState 업데이트
      if (likeData) {
        likeState = likeData.likeState;
      }
    }

    //해당 포스트의 정보를 가져온다.
    let targetPost = await Post.findOne(
      { postUid },
      { _id: false, __v: false }
    );
    // post내부 안에 likeState추가
    let post = targetPost.toObject();
    post.likeState = likeState;

    let comments = [];
    // 가공하기 전 코멘트들
    comments = await Comment.find(
      { postUid },
      { _id: false, __v: false, postUid: false }
    );
    return res.status(200).json({
      success: true,
      post,
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
