const express = require("express");
const app = express();
const port = 3000;
const { User } = require("./mongodb/user");
const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// application/json  json 타입으로 된 것 분석
app.use(express.json());

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
app.post("/register", (req, res) => {
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
