export type TIngredientsItems = {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  id: string,
  _id: number
}

export type TCreatedOrders = {
  orders: [],
  total: number,
  totalToday: number,
  _id: number
}

export type TDragIngredients = {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  key: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  _id: string,
}[] | []