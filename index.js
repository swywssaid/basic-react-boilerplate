const express = require("express");
const app = express();
const port = 3000;
const { auth } = require("./middleware/auth");
const { User } = require("./mongodb/user");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// application/json  json 타입으로 된 것 분석
app.use(express.json());

app.use(cookieParser());

const mongoose = require("mongoose"); //몽구스를 이용하여 몽고DB와 app 연결
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true, // 에러방지
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected")) // 실행 시 출력
  .catch((err) => console.log(err)); // 에러 시 에러 출력

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// 회원가입을 위한 라우트
app.post("/api/users/register", (req, res) => {
  // 회원 가입 시 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣는다.

  const user = new User(req.body); // 인스턴스 생성, bodyparser 기능을 사용했기때문에 json 형식으로 데이터를 깔끔하게 받을수있다.

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); //실패 시 json 형태로 반환
    return res.status(200).json({
      // status:200 은 성공했다는 표시, 성공 시 json 형태로 반환
      success: true,
    });
  }); // mongoDB에서 오는 메소드/ user 모델에 req.body 정보 저장
});

// 로그인을 위한 라우트
app.post("/api/users/login", (req, res) => {
  // 1. 요청된 이메일을 db에서 찾는다
  // User모델에서 findOne이라는 mongodb 메소드를 이용
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 2. 요청된 이메일이 db에 있다면, 비밀번호 비교
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틑렸습니다." });
    });

    // 3. 비밀번호까지 맞다면 토큰을 생성하기
    user.generateToken((err, user) => {
      // status:400 은 에러가 있다는 뜻
      if (err) return res.status(400).send(err);

      /**
       * 토큰을 저장한다 어디에? 현재는 user에 저장이 되어있다.
       * 쿠키, 로컬스트리지, 세션 각기 장단점이 있다.
       * 여기선 쿠키에 저장한다.
       * x_auth : user.token 으로 key:value로 저장.
       */
      res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
    });
  });
});

// auth 인증 라우트
app.use("/api/users/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication(인증)이 True 라는 말
  res.status(200).json({
    // req.user 할 수 있는 이유는 auth.js 미들웨어에서 req에 user넣어줬기때문
    _id: req.user._id,

    // 스키마에서 role 정한대로 하는 것. 여기선 0이 유저
    idAdmin: req.user.role === 0 ? false : ture,
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
