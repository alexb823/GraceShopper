import React from 'react';

import Typography from '@material-ui/core/Typography';

const EmptyCart = () => {
  return (
    <div>
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        Your cart is empty...
      </Typography>
      <Typography variant="overline" style={{ marginTop: '1rem' }}>
        Check out what's on our{' '}
        <a
          href="#/products"
          style={{ color: 'dodgerBlue', textDecoration: 'none' }}
        >
          products
        </a>{' '}
        now!!!
      </Typography>
    </div>
  );
};

export default EmptyCart;
