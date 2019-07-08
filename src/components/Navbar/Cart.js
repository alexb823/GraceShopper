import React from 'react';
import { connect } from 'react-redux';

import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';

const Cart = ({ classes, itemsInCart }) => {
  return (
    <a href="#/cart" style={{ textDecoration: 'none', color: 'grey' }}>
      <IconButton className={classes.IconButton}>
        <Badge badgeContent={itemsInCart} color="secondary">
          <ShoppingCartIcon style={{ color: 'grey' }} />
        </Badge>
      </IconButton>
    </a>
  );
};

const mapStateToProps = ({ lineItems, cart }) => {
  const itemsInCart = lineItems.reduce((sum, { quantity }) => {
    sum += quantity;
    return sum;
  }, 0);

  return {
    itemsInCart,
  };
};

export default connect(mapStateToProps)(Cart);
