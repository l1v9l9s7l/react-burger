import { LOGIN_USER, UPLOAD_USER, AUTH_CHECK, LOGOUT_USER } from "../actions/userAction";

type TUserState = {
  isAuthenticated: boolean,
  email: string,
  name: string,
}

const defaultState: TUserState = {
  isAuthenticated: false,
  email: "",
  name: "",
};
// {isAuthenticated: boolean;email: string;name: string;}
interface ILoginUserAction {
  readonly type: typeof LOGIN_USER;
  readonly payload: {isAuthenticated: boolean;email: string;name: string;}
}

interface IUploadUserAction {
  readonly type: typeof UPLOAD_USER;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    }
  }
}

interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
  readonly payload: {
    isAuthenticated: boolean;
    user: {
      email: string;
      name: string;
    }
  }
}

interface IAuthCheckAction {
  readonly type: typeof AUTH_CHECK;
  readonly payload: boolean
}

type TUserActions = 
|ILoginUserAction
|IUploadUserAction
|ILogoutUserAction
|IAuthCheckAction

export const userReducer = (state = defaultState, action: TUserActions) => {
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
    case AUTH_CHECK: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    default: {
      return state;
    }
  }
};
