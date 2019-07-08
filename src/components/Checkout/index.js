import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Title from './Title';
import ExpansionList from './ExpansionList';
import OrderSummary from './OrderSummary';
import PlaceOrder from './PlaceOrder';

const styles = theme => ({
  sectionMobile: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  orderSummary: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '35%',
      padding: '1rem 0 0 0',
    },
  },
  expansionList: {
    width: '90%',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '60%',
      margin: '0',
    },
  },
  title: {
    margin: '0 auto',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
});

const Cart = ({ classes }) => {
  return (
    <div
      style={{
        paddingTop: '2rem',
        margin: '80px auto 0 auto',
        maxWidth: '960px',
      }}
    >
      <div className={classes.title}>
        <Title />
      </div>
      <div
        style={{
          marginTop: '2rem',
          width: '100%',
          justifyContent: 'space-between',
        }}
        className={classes.sectionMobile}
      >
        <div className={classes.expansionList}>
          <ExpansionList />
        </div>
        <div
          style={{
            paddingTop: '1rem',
          }}
          className={classes.orderSummary}
        >
          <OrderSummary />
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Cart);
