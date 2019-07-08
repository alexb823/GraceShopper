import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormGroup,
  Button,
  Typography,
} from '@material-ui/core';
import { updateCategory, createCategory } from '../../reducers';

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

const EditCategory = ({
  category,
  updateCategory,
  createCategory,
  history,
}) => {
  const name = useFormInput('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    name.setValue(category.name);
  }, [category]);

  const handleOnSubmit = event => {
    event.preventDefault();
    const newCategory = {
      name: name.value,
    };
    if (category.id) {
      updateCategory(category.id, newCategory)
        .then(() => history.push('/admin/categories'))
        .catch(ex => setErrorMessage(ex.response.data));
    } else {
      createCategory(newCategory)
        .then(() => history.push('/admin/categories'))
        .catch(ex => setErrorMessage(ex.response.data));
    }
  };

  const handleErrorMessage = errorMessage => {
    return errorMessage.split(',').map((msg, idx) => (
      <Typography key={idx} variant="subtitle1" color="error">
        {msg}
      </Typography>
    ));
  };

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
            <TextField
              label="Name"
              value={name.value}
              onChange={name.handleChange}
              margin="normal"
              helperText="require"
            />
          </FormControl>
        </Grid>

        <Grid item>
          <FormGroup row>
            <Button type="submit" variant="contained" color="primary">
              {category.id ? 'Update' : 'Create'}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="default"
              style={{ marginLeft: '10px' }}
              onClick={() => history.push('/admin/categories')}
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
    category: state.categories.find(ctg => ctg.id === id) || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: (id, category) => dispatch(updateCategory(id, category)),
    createCategory: category => dispatch(createCategory(category)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCategory);
