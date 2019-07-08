import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  ProductsList,
  Login,
  SingleProduct,
  ManageProducts,
  EditProduct,
  AccessDenied,
  ManageCategories,
  EditCategory,
  Orders,
  ManageUsers,
  EditUser,
  ManageOrders,
} from './';
import Navbar from './Navbar';
import Cart from './Cart';
import Checkout from './Checkout';

import {
  loginSession,
  getUsersCart,
  getProducts,
  getLineItems,
  lineItemsSession,
  getCategories,
  getUserAddresses,
  getCurrentOrders,
  getPastOrders,
} from '../reducers';

class App extends Component {
  componentDidMount() {
    const {
      loginSession,
      getProducts,
      getCategories,
      lineItemsSession,
    } = this.props;

    Promise.all([
      getProducts(),
      loginSession(),
      getCategories(),
      lineItemsSession(),
    ]);

  }

  componentDidUpdate(prevProps) {
    const {
      user,
      cart,
      getUsersCart,
      getLineItems,
      getUserAddresses,
      getCurrentOrders,
      getPastOrders,
    } = this.props;

    if (user.id && user.id !== prevProps.user.id) {
      Promise.all([
        getUsersCart(user.id, 'inCart'),
        getUserAddresses(user.id),
        getCurrentOrders(user.id),
        getPastOrders(user.id),
      ]);
    }
    if (cart.id && cart.id !== prevProps.cart.id) {
      Promise.all([
        getLineItems(cart.id),
        getCurrentOrders(user.id),
        getPastOrders(user.id),
      ]);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <Router>
        <Navbar />
          <Route path="/" exact render={() => <Redirect to="/products" />} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={EditUser} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/products" component={ProductsList} />
        <Switch>
          <Route path="/products/search/:search" component={ProductsList} />
          <Route
            path="/category/:categoryId/search/:search"
            component={ProductsList}
          />
          </Switch>
          <Route exact path="/category/:categoryId" component={ProductsList} />
          <Route path="/products/:productId" exact component={SingleProduct} />
          {user.admin ? (
            <Fragment>
              <Route path="/admin/products" exact component={ManageProducts} />
              <Route path="/admin/products/edit/:id?" component={EditProduct} />
              <Route
                path="/admin/categories"
                exact
                component={ManageCategories}
              />
              <Route
                path="/admin/categories/edit/:id?"
                component={EditCategory}
              />
              <Route path="/admin/users" exact component={ManageUsers} />
              <Route path="/admin/users/edit/:id?" component={EditUser} />
              <Route path="/admin/orders" exact component={ManageOrders} />
            </Fragment>
          ) : (
            <Route path="/admin" component={AccessDenied} />
          )}
          <Route path="/checkout" component={Checkout} />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsersCart: (userId, status) => dispatch(getUsersCart(userId, status)),
    getLineItems: cartId => dispatch(getLineItems(cartId)),
    loginSession: () => dispatch(loginSession()),
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
    getUserAddresses: userId => dispatch(getUserAddresses(userId)),
    lineItemsSession: () => dispatch(lineItemsSession()),
    getCurrentOrders: userId => dispatch(getCurrentOrders(userId)),
    getPastOrders: userId => dispatch(getPastOrders(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
