import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

/**
 * LoginPage.js 로그인
 * @param {Object} dataToSubmit email, password
 * @returns
 */
export function loginUser(dataToSubmit) {
  const request = axios.post("/api/users/login", dataToSubmit).then((response) => response.data);

  // request를 reducer에 보내야함.
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

/**
 * Legister.js 회원가입
 * @param {Object} dataToSubmit email, name, password
 * @returns
 */
export function registerUser(dataToSubmit) {
  const request = axios.post("/api/users/register", dataToSubmit).then((response) => response.data);

  // request를 reducer에 보내야함.
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

/**
 * auth 인증 get 메소드니깐 바디 부분은 필요없음.
 * @returns
 */
export function auth() {
  const request = axios.get("/api/users/auth").then((response) => response.data);

  // request를 reducer에 보내야함.
  return {
    type: AUTH_USER,
    payload: request,
  };
}
