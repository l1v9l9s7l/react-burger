import { SET_CURRENT_PAGE, SUCCESS_PASS_RES_REQUEST } from "../actions/pageAction";

const defaultState = {
  currentPage: "",
  sendPasswordResetRequest: false,
};

export const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    case SUCCESS_PASS_RES_REQUEST: {
      return {
        ...state,
        sendPasswordResetRequest: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
