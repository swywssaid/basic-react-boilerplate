const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt 글자수, salt를 이용해 암호화

const someOtherPlaintextPassword = "not_bacon";
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

/**
 * mongoose 메소드: 유저 정보를 저장(user.save)하기 전에 하는 것 정의
 * 이거 끝나면 저장
 * @param save save 전에 콜백함수 실행
 */
userSchema.pre("save", function (next) {
  const user = this;

  // 비밀번호 변경 시에만 작동하도록
  if (user.isModified("password")) {
    /**
     * 비밀번호를 암호화 시킴
     * @param saltRounds salt글자수
     */
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      /**
       * Store hash in your password DB.
       * @param user.password 암호화전 비밀번호(plain password)
       * @param salt salt
       */
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;

        // save로 넘어가는 함수
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema); // 모델은 스키마를 감쌈/모델명, 스키마명

module.exports = { User }; // 외부에서 사용할 수 있도록함.
