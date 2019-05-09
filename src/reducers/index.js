import { combineReducers } from 'redux';
import { getProducts, productsReducer } from './productsReducer';
import {
  userReducer,
  loginUser,
  logOutUser,
  loginSession,
} from './userReducer';
import { cartReducer, getUsersCart } from './cartReducer';
import {
  lineItemReducer,
  getLineItems,
  addLineItem,
  updateLineItem,
  removeLineItem,
} from './lineItemReducer';
import { categoriesReducer, getCategories } from './categoriesReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  lineItems: lineItemReducer,
  categories: categoriesReducer,
});

export {
  rootReducer,
  getProducts,
  loginUser,
  logOutUser,
  loginSession,
  getUsersCart,
  getLineItems,
  addLineItem,
  updateLineItem,
  getCategories,
  removeLineItem,
};
