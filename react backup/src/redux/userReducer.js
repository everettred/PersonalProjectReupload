import axios from "axios";
import reducer from "./reducer";

const initialState = {
  loading: false,
  errorMessage: "",
  username: "",
  user_id: "",
};

const LOGOUT = "logout";
const LOGIN = "login";
export function login(userObj) {
  let postLogin = () => {
    axios.post("/api/auth/login", userObj).then((res) => res.data);
  };
  return {
    type: LOGIN,
    payload: postLogin,
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: "logged out",
  };
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN + "_PENDING":
      return Object.assign({}, state, { laoding: true });

    case LOGIN + "_FULFILLED":
      return Object.assign({}, state, {
        username: action.payload,
        user_id: action.payload,
        loading: false,
      });

    case LOGIN + "_REJECTED":
      return Object.assign({}, state, { errorMessage: action.payload });
    default:
      return state;

    case LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
