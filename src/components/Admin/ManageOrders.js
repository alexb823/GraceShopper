import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SingleOrder } from '../';

import { getAllOrdersAdmin } from '../../reducers';

const ManageOrders = ({ products, allOrdersAdmin, getAllOrdersAdmin, history, address }) => {
  useEffect(() => {
    getAllOrdersAdmin();
  }, []);

  return (
    <div style={{
    marginTop: "100px",
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
    maxWidth: '800px'}}>
      {allOrdersAdmin.map(order =>  <SingleOrder
              key={order.id}
              order={order}
              address={address}
              products={products}
              history={history}
            />)}
    </div>
  )
}

const mapStateToProps = ({ allOrdersAdmin, products, addresses: {userAddresses} }) => {
  return {
    allOrdersAdmin,
    products,
    address: userAddresses[0] || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrdersAdmin: () => dispatch(getAllOrdersAdmin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageOrders);
