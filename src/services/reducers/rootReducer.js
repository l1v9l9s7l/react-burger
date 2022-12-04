import {
  combineReducers
} from '@reduxjs/toolkit';

import {
  ingridientsReducer
} from './ingridientsReducer';

import {
  orderReducer
} from './orderReducer';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  order: orderReducer
})