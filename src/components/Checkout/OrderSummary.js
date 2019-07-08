import React from 'react';
import { Typography } from '@material-ui/core';

import { connect } from 'react-redux';

const OrderSummary = ({ itemsTotal, tax, subTotal }) => {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Typography
        variant="subtitle2"
        style={{ color: 'grey', fontWeight: 'bold' }}
      >
        Order summary
      </Typography>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          margin: '1rem 0',
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'lighter' }}
        >
          Items(s)
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'lighter' }}
        >
          ${itemsTotal}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          margin: '1rem 0',
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'lighter' }}
        >
          Estimated tax
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'lighter' }}
        >
          ${tax}
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          margin: '1rem 0',
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'lighter' }}
        >
          Shipping & service
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'lighter' }}
        >
          $0
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          margin: '1rem 0',
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'bold' }}
        >
          Estimated total
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ color: 'grey', display: 'block', fontWeight: 'bold' }}
        >
          ${subTotal}
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = ({ lineItems, products }) => {
  const productsInCart = lineItems.map(lineItem => {
    lineItem.productInfo = products.find(product => {
      return product.id === lineItem.productId;
    });
    return lineItem;
  });

  const itemsTotal = productsInCart.length
    ? productsInCart.reduce((sum, { quantity, productInfo: { price } }) => {
        sum += quantity * price;
        return sum;
      }, 0)
    : 0;

  const tax = itemsTotal * 0.1;
  const subTotal = itemsTotal + tax;

  return {
    itemsTotal: itemsTotal.toFixed(2),
    tax: tax.toFixed(2),
    subTotal: subTotal.toFixed(2),
  };
};

export default connect(mapStateToProps)(OrderSummary);
