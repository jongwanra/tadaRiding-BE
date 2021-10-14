const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = new Schema({
  postUid: {
    type: String,
    required: true,
    unique: false,
  },
  commentUid: {
    type: String,
    required: true,
    unique: false,
  },

  userUid: {
    type: String,
    required: true,
    unique: false,
  },

  commentDesc: {
    type: String,
    required: true,
    unique: false,
  },

  commentDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
