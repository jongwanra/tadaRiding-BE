const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  userUid: {
    type: String,
    required: true,
    unique: false,
  },

  userId: {
    type: String,
    required: true,
    unique: false,
  },

  userNickname: {
    type: String,
    required: true,
    unique: false,
  },

  userPassword: {
    type: String,
    required: true,
    unique: false,
  },

  userPhoneNumber: {
    type: String,
    required: true,
    unique: false,
  },

  participatedPost: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
