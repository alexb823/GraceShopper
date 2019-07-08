import axios from 'axios';

const GOT_LINE_ITEMS = 'GOT_LINE_ITEMS';
const ADDED_LINE_ITEM = 'ADDED_LINE_ITEM';
const EMPTY_LINE_ITEM = 'EMPTY_LINE_ITEM';
const GOT_SESSION_LINE_ITEMS = 'GOT_SESSION_LINE_ITEMS';

const gotLineItems = lineItems => {
  return {
    type: GOT_LINE_ITEMS,
    lineItems,
  };
};

const gotSessionLineItems = lineItems => {
  return {
    type: GOT_SESSION_LINE_ITEMS,
    lineItems,
  };
};

const addedLineItem = lineItem => {
  return {
    type: ADDED_LINE_ITEM,
    lineItem,
  };
};

export const emptyLineItem = () => {
  return {
    type: EMPTY_LINE_ITEM,
  };
};

export const lineItemReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_LINE_ITEMS:
      return action.lineItems;
    case ADDED_LINE_ITEM:
      if (Array.isArray(action.lineItem)) return action.lineItem;
      else return [...state, action.lineItem];
    case GOT_SESSION_LINE_ITEMS:
      return action.lineItems;
    case EMPTY_LINE_ITEM:
      return [];
    default:
      return state;
  }
};

// Thunks
// get all the line items for a cart
export const getLineItems = cartId => {
  return dispatch => {
    return axios
      .get(`/api/lineItems/${cartId ? cartId : ''}`)
      .then(response => response.data)
      .then(lineItems => dispatch(gotLineItems(lineItems)));
  };
};

// Add a new line item
export const addLineItem = item => {
  return dispatch => {
    return axios
      .post(`/api/lineItems`, item)
      .then(response => response.data)
      .then(lineItem => dispatch(addedLineItem(lineItem)));
  };
};

// Updated line item quantity
// After updating db will fetch all the line items for the cart
export const updateLineItem = lineItem => {
  return dispatch => {
    return axios
      .put(`api/lineItems/${lineItem.id}`, lineItem)
      .then(() => dispatch(getLineItems(lineItem.cartId)));
  };
};

// Remove a line item
export const removeLineItem = (lineItemId, cartId, productId) => {
  return dispatch => {
    return axios
      .delete(`api/lineItems/${lineItemId}/${productId}`)
      .then(() => dispatch(getLineItems(cartId)));
  };
};

// Will updated quantities for a cart or session
export const manageLineItemQty = (productId, quantity, cartId, lineItem) => {
  return dispatch => {
    if (cartId && lineItem) {
      const newQuantity = lineItem.quantity + quantity;
      const updatedLineItem = { ...lineItem, quantity: newQuantity };
      dispatch(updateLineItem(updatedLineItem));
    } else {
      dispatch(addLineItem({ productId, quantity, cartId }));
    }
  };
};

// Check session for lineItems. Will keep line items in store on hard reload
export const lineItemsSession = () => {
  return dispatch => {
    return axios
      .get('/api/lineItems')
      .then(response => response.data)
      .then(lineItems => dispatch(gotSessionLineItems(lineItems)));
  };
};
