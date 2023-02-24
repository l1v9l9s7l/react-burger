import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredientsReducer";

import { ingredientDetailsReducer } from "./ingredientDetailsReducer";

import { orderReducer } from "./orderReducer";

import { orderDetailsReducer } from "./orderDetailsReducer";

import { userReducer } from "./userReducer";

import { pageReducer } from "./pageReducer";

export const rootReducer = combineReducers({
  ingridients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  page: pageReducer,
});
