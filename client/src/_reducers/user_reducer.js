// reducer 관리
import { LOGIN_USER } from "../_actions/types";

/**
 * LoginUser reducer
 * @param {*} state 이전의 state
 * @param {Object} action dispatch를 통해 받은 action
 * @returns action으로 인해 변한 state
 */
export default function reducer(state = {}, action) {
  // action의 type이 많아지면 타입 마다 다른 조치를 취해야하기 때문에
  // 스위치문법사용
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    default:
      return state;
  }
}
