const mongoose = require('mongoose');

const { Schema } = mongoose;
const postSchema = new Schema({
  postUid: {
    type: String,
    required: true,
    unique: false,
  },
  postTitle: {
    type: String,
    required: true,
    unique: false,
  },

  postDesc: {
    type: String,
    required: true,
    unique: false,
  },

  postDate: {
    type: String,
    required: true,
    unique: false,
  },
  postRegister: {
    type: String,
    required: true,
    unique: false,
  },
  origin: {
    type: String,
    required: true,
    unique: false,
  },

  destination: {
    type: String,
    required: true,
    unique: false,
  },

  postState: {
    type: Boolean,
    required: true,
    unique: false,
  },
  postImage: {
    type: String,
    required: true,
    unique: false,
  },
  limitedUserNum: {
    type: Number,
    required: true,
    unique: false,
  },
  postLikeCnt: {
    type: Number,
    required: true,
    unique: false,
  },
  startTime: {
    type: String,
    required: true,
    unique: false,
  },
  attendUserNicknames: {
    type: Array,
    required: true,
    unique: false,
  },
  postAttendCnt: {
    type: Num,
    required: true,
    unique: false,
  }
});

module.exports = mongoose.model('Post', postSchema);
