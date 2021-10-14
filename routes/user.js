const express = require('express');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt'); // 비밀번호 암호화를 위한 내장모듈
const setRounds = 10;
const User = require('../models/user_info');
const auth = require('../middlewares/auth');

////////////////////////////////////////////////////////////
//                LOGIN CHECK
////////////////////////////////////////////////////////////

router.get('/:userUid/validation', auth.justCheckAuth, async (req, res) => {
  try {
    // 로그인 되어있지 않은 경우,
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: '로그인 되어 있지 않은 유저입니다.',
      });
    }
    // 로그인이 되어있을 경우
    const userUid = req.user.userUid;
    const userNickname = req.user.userNickname;

    return res.status(200).json({
      success: true,
      userUid,
      userNickname,
      msg: '로그인 되어 있는 유저입니다.',
    });
  } catch (err) {
    console.log('로그인 체크 API에서 발생한 에러: ', err);
    res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});
////////////////////////////////////////////////////////////
//                LOGIN
////////////////////////////////////////////////////////////

router.post('/auth', async (req, res) => {
  try {
    const { userId, userPassword } = req.body;

    // 아이디를 가지고있는 회원 정보를 가지고 온다.
    const checkingUser = await User.findOne({ userId }, { _id: false });

    // 검색한 회원의 아이디가 없는 경우(Unauthorized)
    if (!checkingUser) {
      return res.status(401).json({
        success: false,
        msg: '아이디 또는 패스워드를 확인해주세요.',
      });
    }

    // 비밀번호가 일치하지 않는 경우(Unauthorized)
    if (!bcrypt.compareSync(userPassword, checkingUser.userPassword)) {
      return res.status(401).json({
        success: false,
        msg: '아이디 또는 패스워드를 확인해주세요.',
      });
    }
    const userUid = checkingUser['userUid'];
    const userNickname = checkingUser['userNickname'];

    // token 생성
    const token = createJwtToken(userUid);
    res.status(201).json({
      success: true,
      token,
      userUid,
      userNickname,
      msg: '성공적으로 로그인이되었습니다.',
    });
  } catch (err) {
    // 예측하지 못한 에러 발생(Internal Server Error)
    console.log('로그인 API에서 발생한 에러: ', err);
    res
      .status(500)
      .json({ success: false, msg: '예상치 못한 에러가 발생했습니다.' });
  }
});

//JWT 토큰 생성
function createJwtToken(userUid) {
  return jwt.sign({ userUid }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

////////////////////////////////////////////////////////////
//                SIGN UP
////////////////////////////////////////////////////////////
// 이메일, 닉네임 중복확인
router.post('/register', async (req, res) => {
  try {
    // 요청 받기
    const { userId, userNickname, userPhoneNumber, userPassword } = req.body;

    console.log(userId, userNickname, userPhoneNumber, userPassword);
    // userId가 중복되어 있는지 확인
    let result = await checkUserId(userId);
    // 중복된 아이디인 경우,
    if (!result['success']) {
      return res.json(result);
    }

    // userNickname이 중복되는지 확인.
    result = await checkUserNickname(userNickname);
    // 중복된 닉네임인 경우,
    if (result['success'] != true) {
      return res.json(result);
    }

    // 회원가입 성공 시
    const userUid = uuid.v1(); //uuid 생성

    // 비밀번호 암호화(암호화)
    const salt = bcrypt.genSaltSync(setRounds);
    const hashedPassword = bcrypt.hashSync(userPassword, salt);

    // DB에 회원 정보 추가
    await User.create({
      userUid,
      userId,
      userNickname,
      userPhoneNumber,
      userPassword: hashedPassword,
    });

    // 회원가입 성공시(Created)
    return res
      .status(201)
      .json({ success: true, msg: '성공적으로 회원 가입이 완료 되었습니다.' });
  } catch (err) {
    console.log('회원가입 기능에서 발생한 에러: ', err);
    res.status(409).json({ success: false, msg: '회원가입에 실패하였습니다.' });
  }
});
// 아이디 중복 체크 함수
function checkUserId(userId) {
  let msg = '사용 가능한 아이디입니다.';
  return new Promise(async (resolve, reject) => {
    const checkingUser = await User.find({ userId }, { _id: false });

    // DB에 중복된 아이디가 존재하는 경우
    if (checkingUser.length >= 1) {
      msg = '중복된 아이디입니다.';
      return resolve({ success: false, msg });
    }
    return resolve({ success: true, msg });
  });
}

// 닉네임 중복 체크 함수
function checkUserNickname(userNickname) {
  let msg = '사용 가능한 닉네임입니다.';
  return new Promise(async (resolve, reject) => {
    const checkingUser = await User.find({ userNickname }, { _id: false });

    // DB에 중복된 닉네임이 존재하는 경우
    if (checkingUser.length >= 1) {
      msg = '중복된 닉네임입니다.';
      return resolve({ success: false, msg });
    }

    return resolve({ success: true, msg });
  });
}

module.exports = router;
