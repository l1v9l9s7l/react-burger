import { SET_CURRENT_PAGE, SUCCESS_PASS_RES_REQUEST } from "../actions/pageAction";

type TPagestate = {
  currentPage: string,
  sendPasswordResetRequest: boolean,
};

const defaultState: TPagestate = {
  currentPage: "",
  sendPasswordResetRequest: false,
};

interface ISetCurrPage {
  readonly type: typeof SET_CURRENT_PAGE;
  readonly payload: string;
}

interface ISuccPassReq {
  readonly type: typeof SUCCESS_PASS_RES_REQUEST
  readonly payload: boolean
}

type TPageActions =
| ISetCurrPage
| ISuccPassReq;

export const pageReducer = (state = defaultState, action: TPageActions) => {
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
