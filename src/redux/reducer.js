import axios from "axios";

const initialState = {
  loading: false,
  errorMessage: "",
  username: "",
  user_id: "",
  postId: "",
};

const LOGOUT = "logout";
const LOGIN = "login";
const REGISTER = "register";
const EDITPOSTID = "editPostId";
const EDITPOSTIDRESET = "editPostIdReset";
export function login(userObj) {
  return {
    type: LOGIN,
    payload: axios.post("/api/auth/login", userObj),
  };
}

export function register(userObj) {
  return {
    type: REGISTER,
    payload: axios.post("/api/auth/register", userObj),
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: "logged out",
  };
}

export function editPostId(postId) {
  return {
    type: EDITPOSTID,
    payload: postId,
  };
}

export function editPostIdReset() {
  return {
    type: editPostId,
    payload: "reset post id",
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        username: action.payload.data.username,
        user_id: action.payload.data.user_id,
        loading: false,
      };

    case LOGIN + "_PENDING":
      return { ...state, loading: true };

    case LOGIN + "_REJECTED":
      return {
        ...state,
        loading: false,
        errorMessage: "Incorrect login input.",
      };

    case REGISTER + "_PENDING":
      return { ...state, loading: true };

    case REGISTER + "_FULFILLED":
      return {
        ...state,
        username: action.payload.data.username,
        user_id: action.payload.data.user_id,
        loading: false,
      };

    case REGISTER + "_REJECTED":
      return { ...state, loading: false, errorMessage: "User already exists" };

    case LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;

    case EDITPOSTID:
      return { ...state, postId: action.payload };

    case EDITPOSTIDRESET:
      return { ...state, postId: "action.payload.postId" };
  }
}
