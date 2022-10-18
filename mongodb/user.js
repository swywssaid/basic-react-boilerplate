const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  lastname: {
    type: String,
    maxlength: 30,
  },
  role: {
    // 어떤 유저는 관리자가 될 수 있다
    type: Number, // 예를들면 0이면 관리자 나머지는 유저
    default: 1, // 롤을 지정하지 않을 경우 1로 디볼트
  },
  image: String,
  token: {
    // 토큰으로 유효성 관리
    type: String,
  },
  tokenExp: {
    // 토큰 만료일(expiration, 유효기간만료)
    type: Number,
  },
});

const User = mongoose.model("User", userSchema); // 모델은 스키마를 감쌈/모델명, 스키마명

module.exports = { User }; // 외부에서 사용할 수 있도록함.
