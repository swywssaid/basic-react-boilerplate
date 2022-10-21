import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

/**
 *
 * @param {*} SpecificComponent hoc안에 들어갈 컴포넌트
 * @param {*} option null: 아무나 출입 가능한 페이지,
 *                   true: 로그인한 유저만 출입이 가능한 페이지
 *                   false: 로그인한 유저 출입이 불가능한 페이지
 * @param {*} adminRoute default로 null 즉 일반유저, true 시 관리자만 들어갈 수 있음.
 * @returns
 */ // eslint-disable-next-line
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // react component가 렌더링 될 때마다 특정 작업을 실행하는 hook
    // useEffect(function, deps)
    useEffect(() => {
      // redux를 통해서 상태관리, redux를 안쓰면 axios로.
      dispatch(auth()).then((response) => {
        console.log("auth?", response);
        // 여기서 분기처리를 해줘야한다.
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          // 로그인한 상태
          // 어드민만 들어갈 수 있는 페이지에 어드민이 아닌 사람이 들어갈 때 랜딩페이지로
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            // 로그인한 사람은 못들어가는 곳
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, [dispatch, navigate]);

    return <SpecificComponent />;
  }
  return <AuthenticationCheck />;
}
