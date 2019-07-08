import axios from 'axios';

const GOT_ALL_USERS = 'GOT_ALL_USERS';

const gotAllUsers = users => {
  return {
    type: GOT_ALL_USERS,
    users,
  };
};


export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};

// Thunks
// gets all the users
export const getAllUsers = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(response => response.data)
      .then(users => dispatch(gotAllUsers(users)))
  }
}

// delete a user, then gets all the users
export const deleteUser = userId => {
  return dispatch => {
    return axios.delete(`/api/users/${userId}`)
    .then(() => dispatch(getAllUsers()))
  }
}

// update user
export const updateUser = (userId, user) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}`, user)
      .then(() => dispatch(getAllUsers()));
  };
};

// create new user
export const createUser = (user) => {
  return dispatch => {
    return axios
      .post('/api/users', user)
      .then(() => dispatch(getAllUsers()));
  };
};
