import { combineReducers } from 'redux';

import {
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  productsReducer,
} from './productsReducer';

import {
  userReducer,
  loginUser,
  logOutUser,
  loginSession,
} from './userReducer';

import { cartReducer, getUsersCart, gotCart } from './cartReducer';

import {
  lineItemReducer,
  getLineItems,
  addLineItem,
  updateLineItem,
  removeLineItem,
  emptyLineItem,
  addlineItemToCart,
} from './lineItemReducer';

import { categoriesReducer, getCategories } from './categoriesReducer';

import {
  currentOrdersReducer,
  pastOrdersReducer,
  getCurrentOrders,
  getPastOrders,
} from './ordersReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  lineItems: lineItemReducer,
  categories: categoriesReducer,
  currentOrders: currentOrdersReducer,
  pastOrders: pastOrdersReducer,
});

export {
  rootReducer,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  loginUser,
  logOutUser,
  loginSession,
  getUsersCart,
  gotCart,
  getLineItems,
  addLineItem,
  updateLineItem,
  addlineItemToCart,
  emptyLineItem,
  getCategories,
  removeLineItem,
  getCurrentOrders,
  getPastOrders,
};
