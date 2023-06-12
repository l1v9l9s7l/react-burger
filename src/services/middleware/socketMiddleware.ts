// import { getCookie } from "../../utils/utils";

// export const socketMiddleware = (wsUrl, wsActions, auth = false) => {
//   return (store) => {
//     let socket = null;

//     return (next) => (action) => {
//       const { dispatch, getState } = store;
//       const { type, payload } = action;
//       const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
//       if (type === wsInit && auth) {
//         socket = new WebSocket(`${wsUrl}?token=${getCookie("accessToken").slice(7)}`);
//       } else if (type === wsInit) {
//         socket = new WebSocket(`${wsUrl}`);
//       }

//       if (socket) {
//         socket.onopen = (event) => {
//           dispatch({ type: onOpen, payload: event });
//         };

//         socket.onerror = (event) => {
//           dispatch({ type: onError, payload: event });
//         };

//         socket.onmessage = (event) => {
//           const { data } = event;
//           const parsedData = JSON.parse(data);
//           const { success, ...restParsedData } = parsedData;

//           dispatch({ type: onMessage, payload: restParsedData });
//         };

//         socket.onclose = (event) => {
//           dispatch({ type: onClose, payload: event });
//         };

//         if (type === wsSendMessage) {
//           const message = { ...payload };
//           socket.send(JSON.stringify(message));
//         }
//       }

//       next(action);
//     };
//   };
// };

import { Middleware, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/utils";
import { AppDispatch, RootState } from "../types";


type TDicNameSocketActions = 
| 'wsInit' | 'wsSendMessage' | 'onOpen' | 'onClose'
| 'onError' | 'onMessage';

type TSocketAction = {
  [name in TDicNameSocketActions]: string;
};

export const socketMiddleware = (wsUrl:string, wsActions:TSocketAction, auth:boolean = false):Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: null | WebSocket = null;
  
      return next => action => {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
        const { name } = getState().user;
        if (type === wsInit && name && auth) {
          socket = new WebSocket(`${wsUrl}?token=${getCookie("accessToken").slice(7)}`);
        } else if(type === wsInit){
            socket = new WebSocket(`${wsUrl}`);
        }

        if (socket) {
          socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = event => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
  
            dispatch({ type: onMessage, payload: restParsedData });
          };
  
          socket.onclose = event => {
            dispatch({ type: onClose, payload: event });
          };
  
          if (type === wsSendMessage) {
            const message = { ...payload };
            socket.send(JSON.stringify(message));
          }
        }
  
        next(action);
      };
    };
  };
