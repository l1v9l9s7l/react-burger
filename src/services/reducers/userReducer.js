import { LOGIN_USER } from "../actions/userAction";

const defaultState = {
  isAuthenticated: false,
  email: "",
  name: "",
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        email: action.payload.email,
        name: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
