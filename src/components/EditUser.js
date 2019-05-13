import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {Paper, Grid, TextField, MenuItem, FormControl, FormGroup, Button, Typography} from '@material-ui/core';

import { updateUser, createUser } from '../reducers';


// Custom hook for form input field
// Sets input field value creates setValue and handleChage methods
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  return {
    value,
    setValue,
    handleChange,
  };
};

  
  
const EditUser = ({ user, updateUser, createUser, history }) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const imageUrl = useFormInput('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    firstName.setValue(user.firstName);
    lastName.setValue(user.lastName);
    email.setValue(user.email);
    password.setValue(user.password);
    imageUrl.setValue(user.imageUrl);
  }, [user]);

//   const handleOnSubmit = event => {
//     event.preventDefault();
//     const newProduct = {
//       name: name.value,
//       price: price.value,
//       quantity: quantity.value,
//       categoryId: categoryId.value,
//       description: description.value,
//       imageUrl: imageUrl.value,
//     };
//     if (product.id) {
//       updateProduct(product.id, newProduct)
//         .then(() => history.push('/admin/products'))
//         .catch(ex => setErrorMessage(ex.response.data));
//     } else {
//       createProduct(newProduct)
//         .then(() => history.push('/admin/products'))
//         .catch(ex => setErrorMessage(ex.response.data));
//     }
//   };
  
  const handleErrorMessage = (errorMessage) => {
    return errorMessage.split(',')
      .map((msg,idx) => (
        <Typography key={idx} variant="subtitle1" color="error">
          {msg}
        </Typography>))
  }

  return (
    <form >
      <Grid
        container
        spacing={24}
        style={{
          width: '100vw',
          marginTop: '100px',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
      
      {errorMessage && (
        <Grid item xs={12}>
          {handleErrorMessage(errorMessage)}
        </Grid>
      )}
            
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="First Name"
              value={firstName.value}
              onChange={firstName.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Last Name"
              value={lastName.value}
              onChange={lastName.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Email"
              type="email"
              value={email.value}
              onChange={email.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="Password"
              type="password"
              value={password.value}
              onChange={password.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Image Url"
              name="imageUrl"
              value={imageUrl.value}
              onChange={imageUrl.handleChange}
              margin="normal"
            />
          </FormControl>
        </Grid>
        
        <Grid item>
          <FormGroup row>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {user.id ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="default"
              style={{marginLeft: "10px"}}
              onClick={() => history.push('/admin/users')}
            >
              Cancel
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id * 1;
  return {
    user: state.users.find(user => user.id === id) || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, user) => dispatch(updateUser(id, user)),
    createUser: (user) => dispatch(createUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
