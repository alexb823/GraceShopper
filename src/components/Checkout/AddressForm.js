import React from 'react';
import { connect } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { createAddress, updateAddress } from '../../reducers';

class AddressForm extends React.Component {
  state = {
    streetAddress: '',
    streetAddress2: '',
    city: '',
    zipCode: '',
    state: '',
  };

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  handleFormSubmit = (event, userId, newAddress, savedAddress) => {
    event.preventDefault();
    const { streetAddress, streetAddress2, city, zipCode, state } = newAddress;
    if (savedAddress) {
      this.props.updateAddress(userId, savedAddress.id, {
        streetAddress,
        streetAddress2,
        city,
        zipCode,
        state,
      });
    } else {
      this.props.createAddress(userId, {
        streetAddress,
        streetAddress2,
        city,
        zipCode,
        state,
      });
    }
  };

  componentDidMount() {
    if (this.props.savedAddress) this.setState({ ...this.props.savedAddress });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.savedAddress !== this.props.savedAddress &&
      !!this.props.savedAddress.id
    ) {
      this.setState({ ...this.props.savedAddress });
    }
  }

  render() {
    const { handleChange, handleFormSubmit } = this;
    const { streetAddress, streetAddress2, city, zipCode, state } = this.state;
    const { userId, savedAddress } = this.props;
    return (
      <form
        style={{
          display: 'flex',
          flewWrap: 'wrap',
          width: '100%',
          flexDirection: 'column',
          paddingLeft: '1rem',
        }}
      >
        <TextField
          label="Address line 1"
          style={{ margin: '0 1rem' }}
          value={streetAddress}
          required
          onChange={handleChange('streetAddress')}
          margin="normal"
          style={{ width: '90%' }}
        />
        <TextField
          label="Address line 2"
          style={{ margin: '0 1rem' }}
          value={streetAddress2}
          onChange={handleChange('streetAddress2')}
          helperText="Apartment, unit, floor, etc."
          margin="normal"
          style={{ width: '90%' }}
        />
        <TextField
          label="City"
          style={{ margin: '0 1rem' }}
          value={city}
          required
          onChange={handleChange('city')}
          margin="normal"
          style={{ width: '90%' }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <TextField
            label="State"
            style={{ margin: '0 1rem' }}
            required
            value={state}
            onChange={handleChange('state')}
            margin="normal"
            style={{ width: '47%' }}
          />
          <TextField
            label="ZIP Code"
            style={{ margin: '0 1rem' }}
            required
            value={zipCode}
            onChange={handleChange('zipCode')}
            margin="normal"
            style={{ width: '47%' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '90%',
            marginTop: '1rem',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100px', marginBottom: '1rem' }}
            onClick={event =>
              handleFormSubmit(event, userId, { ...this.state }, savedAddress)
            }
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartId: state.cart.id,
    userId: state.user.id,
    state,
  };
};

export default connect(
  mapStateToProps,
  { createAddress, updateAddress }
)(AddressForm);
