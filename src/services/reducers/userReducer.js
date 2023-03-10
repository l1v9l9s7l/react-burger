import { LOGIN_USER, UPLOAD_USER } from "../actions/userAction";

const defaultState = {
  isAuthenticated: false,
  email: "",
  name: "",
  // password: "",
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        email: action.payload.email,
        name: action.payload.name,
      };
    }
    case UPLOAD_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.success,
        email: action.payload.user.email,
        name: action.payload.user.name,
      };
    }
    default: {
      return state;
    }
  }
};
