const mongoose = require('mongoose');

const { Schema } = mongoose;
const likeSchema = new Schema({
  postID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  likeState: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Like', likeSchema);