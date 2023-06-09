import {
  GET_MENU_REQUEST,
  GET_MENU_REQUEST_FAILED,
  GET_MENU_REQUEST_FINISH,
  GET_MENU_REQUEST_SUCCESS,
} from "../actions/ingridientsAction";

import { TIngredientsItems } from "../types/data";

import React, { useEffect } from "react";

type TIngredientsState = {
  ingridients: ReadonlyArray<TIngredientsItems>,

  itemsRequest: null,
  itemsRequestFailed: null,
  itemsRequestFailedMessage: null,
};


export interface IGetMenuReqAction {
  readonly type: typeof GET_MENU_REQUEST;
}
export interface IGetMenuReqFailedAction {
  readonly type: typeof GET_MENU_REQUEST_FAILED;
  readonly err: string;
}
export interface IGetMenuReqFinishAction {
  readonly type: typeof GET_MENU_REQUEST_FINISH;
}

export interface IGetMenuReqSuccessAction {
  readonly type: typeof GET_MENU_REQUEST_SUCCESS;
  readonly items: TIngredientsItems[];
}

export type TIngredientsActions = 
  | IGetMenuReqAction
  | IGetMenuReqFailedAction
  | IGetMenuReqFinishAction
  | IGetMenuReqSuccessAction;


const defaultState: TIngredientsState = {
  //Список всех полученных ингредиентов
  ingridients: [],
  itemsRequest: null,
  itemsRequestFailed: null,
  itemsRequestFailedMessage: null,
};

export const ingredientsReducer = (state = defaultState, action: TIngredientsActions) => {
  //Создали редьюсер и задали начальное состояние
  switch (action.type) {
    case GET_MENU_REQUEST_SUCCESS:
      return {
        ...state,
        ingridients: action.items,
      };
    case GET_MENU_REQUEST_FAILED: {
      return {
        ...state,
        items: [],
        itemsRequestFailed: true,
        itemsRequestFailedMessage: action.err,
      };
    }
    case GET_MENU_REQUEST_FINISH: {
      return {
        ...state,
        itemsRequest: false,
      };
    }
    case GET_MENU_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsRequestFailed: false,
        itemsRequestFailedMessage: "",
      };
    }
    default:
      return state;
  }
};
