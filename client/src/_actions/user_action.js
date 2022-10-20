import axios from "axios";
import { LOGIN_USER } from "./types";

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
    type: LOGIN_USER,
    payload: request,
  };
}
