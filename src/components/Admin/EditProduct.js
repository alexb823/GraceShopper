import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { updateProduct, createProduct } from '../../reducers';

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

const EditProduct = ({ product, categories, updateProduct, createProduct, history }) => {
  const name = useFormInput('');
  const price = useFormInput('');
  const quantity = useFormInput('');
  const categoryId = useFormInput('');
  const description = useFormInput('');
  const imageUrl = useFormInput('');
  const [available, setAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    name.setValue(product.name);
    price.setValue(product.price);
    quantity.setValue(product.quantity);
    categoryId.setValue(product.categoryId);
    description.setValue(product.description);
    imageUrl.setValue(product.imageUrl);
    setAvailable(product.available);
  }, [product]);
  
   const handleAvailableChange = event => {
    setAvailable(event.target.checked);
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    const newProduct = {
      name: name.value,
      price: price.value,
      quantity: quantity.value,
      categoryId: categoryId.value,
      description: description.value,
      imageUrl: imageUrl.value,
      available,
    };
    if (product.id) {
      updateProduct(product.id, newProduct)
        .then(() => history.push('/admin/products'))
        .catch(ex => setErrorMessage(ex.response.data));
    } else {
      createProduct(newProduct)
        .then(() => history.push('/admin/products'))
        .catch(ex => setErrorMessage(ex.response.data));
    }
  };

  const handleErrorMessage = (errorMessage) => {
    return errorMessage.split(',')
      .map((msg,idx) => (
        <Typography key={idx} variant="subtitle1" color="error">
          {msg}
        </Typography>))
  }

  return (
    <form onSubmit={handleOnSubmit}>
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
      
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Switch
                  checked={available}
                  onChange={handleAvailableChange}
                  color="primary"
                />
              }
              label="Availability"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Name"
              value={name.value}
              onChange={name.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <TextField
              label="Price"
              value={price.value}
              onChange={price.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <TextField
              label="Quantity"
              value={quantity.value}
              onChange={quantity.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              select
              label="Category"
              value={categoryId.value || ''}
              onChange={categoryId.handleChange}
              margin="normal"
            >
              {categories.map(ctg => (
                <MenuItem key={ctg.id} value={ctg.id}>
                  {ctg.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Description"
              name="description"
              multiline
              rows="8"
              value={description.value}
              onChange={description.handleChange}
              margin="normal"
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
              {product.id ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="default"
              style={{marginLeft: "10px"}}
              onClick={() => history.push('/admin/products')}
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
    product: state.products.find(prod => prod.id === id) || {},
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (id, product) => dispatch(updateProduct(id, product)),
    createProduct: (product) => dispatch(createProduct(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);
