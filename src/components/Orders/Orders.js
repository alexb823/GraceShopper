import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import SingleOrder from './SingleOrder';

const Orders = ({
  currentOrders,
  pastOrders,
  products,
  userAddresses,
  user,
  history,
}) => {
  return (
    <div
      style={{
        width: 'auto',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '80px',
      }}
    >
      <Typography variant="h3" align="center">
        Your Orders
      </Typography>
      {user.id ? (
      <Fragment>
        <Typography variant="h4">Open Orders</Typography>
        {currentOrders.map(order => {
          const address = userAddresses.find(
            addy => addy.id === order.addressId
          );
          return (
            <SingleOrder
              key={order.id}
              order={order}
              address={address}
              products={products}
              history={history}
            />
          );
        })
       }
      <Typography variant="h4">Past Orders</Typography>
      {pastOrders.map(order => {
        const address = userAddresses.find(addy => addy.id === order.addressId);
        return (
          <SingleOrder
            key={order.id}
            order={order}
            address={address}
            products={products}
            history={history}
          />
        );
      })}
      </Fragment> 
      ) : (
        <Typography variant="subtitle2" style={{textAlign: 'center'}}>
          Please <Link to='/login'>login</Link> to view your orders
        </Typography>
      )
      }
    </div>
  );
};

const mapStateToProps = ({
  user,
  currentOrders,
  pastOrders,
  products,
  addresses,
}) => {
  return {
    user,
    currentOrders,
    pastOrders,
    products,
    userAddresses: addresses.userAddresses,
  };
};

export default connect(mapStateToProps)(Orders);
