import React from 'react';

import Title from './Title';
// import NotInStockMsg from './NotInStockMsg';
import Products from './Products';

const Cart = () => {
  return (
    <div
      style={{
        paddingTop: '2rem',
        margin: '80px auto 0',
        maxWidth: '960px',
      }}
    >
      <Title />
      {/* <NotInStockMsg /> */}
      {/* Will handle the above later */}
      <Products />
    </div>
  );
};

export default Cart;
