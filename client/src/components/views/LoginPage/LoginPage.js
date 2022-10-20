import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  // Redux: dispatch 생성
  const dispatch = useDispatch();

  //useNavigate는 양식이 제출되거나 특정 event가 발생할 때,
  //url을 조작할 수 있는 interface를 제공합니다.
  const navigate = useNavigate();

  // emali, password state 생성
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // state 변경을 위한 onChage 설정
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    // 리덕스를 사용하지 않으면
    // axios를 통해 서버에 emali, password 현재 state을 보냄.

    // Redux: dispatch 실행, reducer에 body 보낸다.
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
