import axios from 'axios';

const GOT_ALL_ADDRESSES = 'GOT_ALL_ADDRESSES';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

const initialState = {
  userAddresses: [],
  selectedAddressId: '',
};

// Reducer
export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ADDRESSES:
      return { ...state, userAddresses: action.addresses };
    case UPDATE_ADDRESS: {
      return { ...state, selectedAddressId: action.addressId };
    }
    default:
      return state;
  }
};

export const gotAddresses = addresses => ({
  type: GOT_ALL_ADDRESSES,
  addresses,
});

export const updateSelectedAddress = addressId => ({
  type: UPDATE_ADDRESS,
  addressId,
});

export const getUserAddresses = userId => {
  return dispatch => {
    return axios
      .get(`/api/address/${userId}`)
      .then(response => gotAddresses(response.data))
      .then(action => dispatch(action));
  };
};

export const createAddress = (userId, address) => {
  return dispatch => {
    return axios
      .post(`/api/address`, { ...address, userId })
      .then(() => dispatch(getUserAddresses(userId)));
  };
};

export const updateAddress = (userId, addressId, newAddress) => {
  return dispatch => {
    return axios
      .put(`/api/address/${addressId}`, { ...newAddress })
      .then(() => dispatch(getUserAddresses(userId)));
  };
};

export const removeAddress = (addressId, userId) => dispatch => {
  return axios
    .delete(`/api/address/${addressId}`)
    .then(() => dispatch(getUserAddresses(userId)));
};
