const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt 글자수, salt를 이용해 암호화
const jwt = require("jsonwebtoken");

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

/**
 * 비밀번호 비교 메소드 정의하기
 * @param plainPassword 유저가 입력한 암호화전 비밀번호
 */
userSchema.methods.comparePassword = function (plainPassword, callback) {
  /**
   * plainPassword: 123123
   * 암호화된 비밀번호:$2b$10$3m2xhbqBH/QmWHynTDytWOePGfudco9omId5y9owYS6xIGU5VYGNu
   * plainPassword을 암호화 후 비교해야함. 암호화된걸 복호화해서 비교는 불가.
   * @param plainPassword 암호화 전 비밀번호
   * @param this.password 비밀번호 스키마 구조
   */
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    // 비밀번호 비교 후 같지 않다면 err
    if (err) return callback(err);
    // 비밀번호 같다면 err: null/ isMathch: true
    callback(null, isMatch);
  });
};

/**
 *
 * @param {function} callback
 */
userSchema.methods.generateToken = function (callback) {
  const user = this;

  /**
   * jsonwebtoken을 이용해서 token을 생성하기
   * user._id + "secretToken" = token
   * 토큰이 만들어지고 "secretToken"를 통해 user._id 찾을 수 있다.
   * @param user._id 코드상엔 안보이지만 db에 _id 자동 생성되어있음.
   * @return token
   */
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

/**
 *
 */
userSchema.statics.findByToken = function (token, callback) {
  const user = this;

  // 토큰을 decode 한다.
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 id를 이용해서 db에서 유저를 찾는다.
    // 클라이언트에서 가져온 토큰과 db의 토큰 비교.
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema); // 모델은 스키마를 감쌈/모델명, 스키마명

module.exports = { User }; // 외부에서 사용할 수 있도록함.
