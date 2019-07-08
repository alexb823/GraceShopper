import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateUserCart, createUserCart } from '../../reducers';

import { Button } from '@material-ui/core';

class PlaceOrder extends Component {
  submitOrder = () => {
    const {
      selectedAddressId,
      updateCart,
      createCart,
      history,
      userId,
      cartId,
    } = this.props;

    if (selectedAddressId) {
      updateCart(cartId, 'processing', selectedAddressId);
      createCart(userId);
      history.push('/orders');
      console.log('order submitted!');
    }
  };

  render() {
    const { submitOrder } = this;
    return (
      <div style={{ width: '100%' }}>
        <Button
          onClick={() => {
            submitOrder();
          }}
          variant="contained"
          color="primary"
          style={{ width: '100%' }}
        >
          Place order
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ addresses, cart, user }) => {
  return {
    selectedAddressId: addresses.selectedAddressId,
    cartId: cart.id,
    userId: user.id,
    cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCart: (cartId, status, addressId) =>
      dispatch(updateUserCart(cartId, status, addressId)),
    createCart: userId => dispatch(createUserCart(userId, 'inCart')),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlaceOrder)
);
