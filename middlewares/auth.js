const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user_info');

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    // 로그인 안했을 경우 들어와 짐.
    return res
      .status(401)
      .json({ success: false, msg: '로그인이 필요합니다.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    // 해독하면서 에러가 발생한 경우
    // 유효기간이 끝났을 때 여기로
    console.log(decoded); // 이 부분이 undefined
    if (error) {
      return res
        .status(401)
        .json({ success: false, msg: '로그인 기간이 만료되었습니다.' });
    }

    // 존재하지 않는 회원인 경우
    const user = await User.findOne(
      { userUid: decoded.userUid },
      { _id: false }
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: '존재하지 않는 회원입니다.' });
    }
    req.user = user;
    next();
  });
};

// 토큰이 있는 여부만 파악하고 user를 받기 위한 미들웨어
const justCheckAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    // 로그인 안했을 경우 들어와 짐.
    return next();
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    // 해독하면서 에러가 발생한 경우
    // 유효기간이 끝났을 때 여기로
    if (error) {
      return next();
    }

    // 존재하지 않는 회원인 경우
    const user = await User.findOne(
      { userUid: decoded.userUid },
      { _id: false }
    );
    if (!user) {
      return next();
    }
    req.user = user;
    return next();
  });
};

module.exports = {
  isAuth,
  justCheckAuth,
};
