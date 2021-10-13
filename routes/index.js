const express = require('express');
const router = express.Router();
const user = require('./user');
const like = require('./like');
const post = require('./post');
const Post = require('../models/post_info');
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
  host: 'localhost:3001',
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
  console.log('게시글 불러오기에 들어와 졌다.');
  try {
    const user = req.user;
    const posts = await Post.find({}, { _id: false });
    // 유저가 로그인 한 경우
    if (user) {
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
router.get('/posts/:postUid', async (req, res, next) => {
  try {
    const postUid = req.params.postUid;

    const targetPost = await Post.findOne({ postUid }, { _id: false });

    return res.status(200).json({
      success: true,
      post: targetPost,
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
