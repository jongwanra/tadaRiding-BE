const mongoose = require('mongoose');

const { Schema } = mongoose;
const likeSchema = new Schema({
  userUid: {
    type: String,
    required: true,
    unique: false,
  },
  postUid: {
    type: String,
    required: true,
    unique: false,
  },
  likeState: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Like', likeSchema);
