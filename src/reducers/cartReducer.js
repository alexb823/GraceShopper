import axios from 'axios';

const GOT_CART = 'GOT_CART';

export const gotCart = cart => {
  return {
    type: GOT_CART,
    cart,
  };
};

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    default:
      return state;
  }
};

// Thunks

// Get user carts - This is commented out because the redux store currently can only store one cart at a time
// export const getUserCarts = userId => dispatch =>
//   axios
//     .get(`/api/carts/${userId}`)
//     .then(response => response.data)
//     .then(carts => dispatch(gotCart(carts)));

// Get users cart(s) per status. There should be only one with status of 'inCart'
export const getUsersCart = (userId, status) => {
  return dispatch => {
    return axios
      .get(`/api/carts/${userId}/${status}`)
      .then(response => response.data)
      .then(cart => dispatch(gotCart(cart[0])));
  };
};

// Update user cart by chnaging the status and addressId
export const updateUserCart = (cartId, status, addressId) => dispatch => {
  return axios
    .put(`/api/carts/${cartId}`, { status, addressId })
    .then(updatedCart => dispatch(gotCart(updatedCart)));
};

// Create a user cart and set it as inCart
export const createUserCart = (userId, status) => dispatch => {
  return axios
    .post(`/api/carts/`, { userId, status })
    .then(response => response.data)
    .then(newCart => dispatch(gotCart(newCart)))
};
