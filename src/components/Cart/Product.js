import React from 'react';
import { connect } from 'react-redux';

import { removeLineItem } from '../../reducers';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import QuantitySetter from './QuantitySetter';
import QuantitySetter from './QuantitySetter';

const Product = ({ lineItem, removeLineItem }) => {
  const {
    id,
    cartId,
    productId,
    productInfo: { imageUrl, price, name },
  } = lineItem;
  return (
    <div
      style={{
        heigth: '200px',
        borderTop: '1px solid lightGrey',
        borderBottom: '1px solid lightGrey',
        padding: '1rem 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <a href={`#/products/${id}`}>
        <img src={imageUrl} height="100px" />
      </a>
      <div style={{ marginLeft: '2rem' }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
          ${Number(price).toFixed(2)}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <QuantitySetter lineItem={lineItem} />
        <Button
          onClick={() => {
            removeLineItem(id, cartId, productId);
          }}
          color="secondary"
          style={{ margin: '1rem' }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { removeLineItem }
)(withStyles(styles)(Product));
