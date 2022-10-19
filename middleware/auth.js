const { User } = require("../mongodb/user");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookie.x_auth;

  // 토큰을 복호화한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // 라우트에서 req 속 정보를 이용하기 위해 req에 정보 담는다.
    req.token = token;
    req.user = user;

    // 없다면 미들웨어에 갇힌다. 다음으로 넘어가도록함.
    next();
  });
  // 유저가 있으면 인증 ok
  // 유저 없으면 인증 ok
};

module.exports = { auth };
