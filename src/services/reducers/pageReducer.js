import { SET_CURRENT_PAGE } from "../actions/pageAction";

const defaultState = {
  currentPage: "",
};

export const pageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
