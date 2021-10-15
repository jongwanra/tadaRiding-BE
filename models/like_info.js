const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
  postUid: {
    type: String,
    required: true,
    unique: false,
  },
  userUid: {
    type: String,
    required: true,
    unique: false,
  },

  likeState: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('Like', likeSchema);
